import { tool } from 'ai';
import { z } from 'zod';
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

export const weatherTool = tool({
    description: `
        Hoje é dia ${today}.

        Ferramenta para buscar a previsão climática por meio da API de WeatherBit.
        Deve-se buscar a informação da cidade e período.
    `.trim(),
    parameters: z.object({
        filters: z.object({
            startDate: z.string().date().transform(value => new Date(value).toISOString()).optional().describe('Data incial de pesquisa que o usuário deseja realizar a experiência'),
            endDate: z.string().date().transform(value => new Date(value).toISOString()).optional().describe('Data final de pesquisa que o usuário deseja realizar a experiência. se surgir alguma dúvida sobre qual a data final, incluir a mesma data do `startDate`.'),
            city: z.string().optional().describe('Nome da cidade para filtrar'),
        }).describe('Objeto com os filtros para a busca')
    }),
    execute: async ({ filters }) => {
        let weatherData = null;

        console.log('WEATHER_FILTERS', filters);

        try {
            if (filters.startDate && filters.endDate) {
                const currentDate = new Date(today);
                const endDate = new Date(filters.endDate);
                const diffTime = Math.abs(endDate.getTime() - currentDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(diffDays < 8) {
                    weatherData = await getWeatherService({city: filters.city || 'Rio de Janeiro', days: diffDays + 1});
                }
            }
        } catch(error) {
            console.log('WEATHER_ERROR', error);
        }
    
        return {
            cityWeather: filters.city,
            weatherData
        };
    }
})
