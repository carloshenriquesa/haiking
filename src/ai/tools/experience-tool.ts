import { tool } from 'ai';
import { z } from 'zod';
import supabase from '@/supabase';
import { convertKeysToCamelCase } from '@/utils/format';
import { getWeatherService } from '@/services/weather.service';

// Função para obter a data atual no fuso horário local no formato YYYY-MM-DD
function getCurrentDateInLocalTimezone(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0, por isso +1
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const today = getCurrentDateInLocalTimezone();

export const experienceTool = tool({
    description: `
        Hoje é dia ${today}.

        Ferramenta para buscar experiências de atividades físicas (trilhas, viagens, passeios) na natureza com base nos critérios fornecidos pelo usuário.
        Realiza queries dinâmicas no Supabase para filtrar experiências na tabela "experiences" conforme os parâmetros recebidos.
        **IMPORTANTE**: Esta ferramenta NÃO deve inventar dados, use apenas os dados fornecidos pelo banco de dados.
        Apenas operações de leitura (SELECT) são permitidas.
        
        Tabela disponível para consulta (supabase):
        experiences {
            id: string - Identificador único do experiência
            name: string - Nome do experiência
            level: enum - Nível de dificuldade ('strong', 'moderate', 'light', 'walkway')
            distance: number - Distância em quilômetros. Considerar:
            - Distância Curta: Até 3km
            - Distância Média: Entre 3km e 7km
            - Distância Longa: Acima de 7km
            city: string - Nome da cidade (ex: "São Paulo")
            state: string - UF do estado (ex: "SP")
            park: string - Nome do parque ou local
            elevation: number - Elevação em metros
            tags: string[] - Lista de tags relacionadas ao experiência, que podem incluir características como: cachoeiras, poços, trilha na mata, praias, etc.
            duration: number - Duração média de caminhada/corrida em minutos, considerando o ponto de partida e ponto de chegada.
            slug: string - identificador único do experiência para criação do link.
            description: string - Descrição sobre o experiência
            image_url: string - URL da imagem do experiência.
        }

        Exemplos de uso:
        - Buscar experiências por cidade: { city: "São Paulo" }
        - Buscar experiências por nível: { level: "moderate" }
        - Buscar experiências por distância máxima: { maxDistance: 10 }
        - Buscar experiências por tempo máximo de caminhada: { duration: 180 }
        - Buscar experiências por características do local: { tags: ["cachoeiras", "poços", "praias"] }
        - Combinar filtros: { city: "São Paulo", level: "light" }
        - Buscar experiências próximos a minha localização: {city: "Rio de Janeiro", state: "RJ"}
    `.trim(),
    parameters: z.object({
        filters: z.object({
            city: z.string().optional().describe('Nome da cidade para filtrar'),
            state: z.string().optional().describe('UF do estado para filtrar'),
            level: z.enum(['strong', 'moderate', 'light', 'walkway']).optional().describe('Nível de dificuldade'),
            maxDistance: z.number().optional().describe('Distância máxima em km'),
            minDistance: z.number().optional().describe('Distância mínima em km'),
            park: z.string().optional().describe('Nome do parque ou local'),
            maxElevation: z.number().optional().describe('Elevação máxima em metros'),
            minElevation: z.number().optional().describe('Elevação mínima em metros'),
            tags: z.string().array().optional().default([]).describe('Tags relacionadas à experiência/trilha/passeio/viagem. Exemplo: cachoeiras, poços, pirambeira'),
            duration: z.number().optional().describe('Tempo médio de caminhada/corrida em minutos'),
        }).describe('Objeto com os filtros para a busca')
    }),
    execute: async ({ filters }) => {
        let queryExperiences = supabase.from('experiences').select('id, name, slug, image_url, level, description, tags, distance, city, state, park, elevation, duration');

        console.log('EXPERIENCE_FILTERS', filters);
    
        if (filters.city) {
            queryExperiences = queryExperiences.eq('city', filters.city);
        }
        if (filters.state) {
            queryExperiences = queryExperiences.eq('state', filters.state);
        }
        if (filters.level) {
            queryExperiences = queryExperiences.eq('level', filters.level);
        }
        if (filters.maxDistance) {
            queryExperiences = queryExperiences.lte('distance', filters.maxDistance);
        }
        if (filters.minDistance) {
            queryExperiences = queryExperiences.gte('distance', filters.minDistance);
        }
        if (filters.park) {
            queryExperiences = queryExperiences.eq('park', filters.park);
        }
        if (filters.maxElevation) {
            queryExperiences = queryExperiences.lte('elevation', filters.maxElevation);
        }
        if (filters.minElevation) {
            queryExperiences = queryExperiences.gte('elevation', filters.minElevation);
        }
        if (filters.tags && filters.tags.length > 0) {
            queryExperiences = queryExperiences.overlaps('tags', filters.tags);
        }
        if (filters.duration) {
            queryExperiences = queryExperiences.lte('duration', filters.duration);
        }

        const { data: experiencesData, error: experiencesError } = await queryExperiences;

        if (experiencesError) {
            throw new Error(`Erro ao buscar experiências: ${experiencesError.message}`);
        }

        const data = experiencesData.map(experience => (convertKeysToCamelCase(experience)));

        return data;
    }
})
