import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
// import { NextResponse } from 'next/server';
import { experienceTool } from '@/ai/tools/experience-tool';
import { weatherTool } from '@/ai/tools/weather-tool';

export async function POST(request: Request) {
    const { messages } = await request.json();

    const groq = createGroq({
        apiKey: process.env.NEXT_PUBLIC_GROC_API_KEY,
    });

    const result = streamText({
        model: groq('qwen-qwq-32b'),
        temperature: 0,
        frequencyPenalty: 1,      
        messages,
        tools: { experienceTool, weatherTool },
        system: `
            Você é um assistente especializado em guiamento e atividades físicas na natureza.
            Seu objetivo principal é ajudar os usuários a encontrar experiências, trilhas, passeios ou viagens relacionados à natureza.
            As buscas devem ser feitas EXCLUSIVAMENTE com a ferramenta fornecida e os dados do banco de dados associado a ela, NÃO é para incluir qualquer tipo de informação externa.

            A resposta deve ser humanizada e amigável baseada nos resultados. O texto precisa ser sucinto, com no máximo duas frases.
        `.trim(),
        maxSteps: 5,
    });

    return result.toDataStreamResponse();
}
