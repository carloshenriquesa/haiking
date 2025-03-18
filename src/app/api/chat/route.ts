import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { NextResponse } from 'next/server';
import { experienceTool } from '@/ai/tools/experience-tool';

export async function POST(request: Request) {
    const { message } = await request.json();

    const groq = createGroq({
        apiKey: process.env.NEXT_PUBLIC_GROC_API_KEY,
    });

    const { text: answer, steps } = await generateText({
        model: groq('qwen-qwq-32b'),  
        temperature: 0,
        frequencyPenalty: 1,      
        prompt: message,
        tools: { experienceTool },
        system: `
            Você é um assistente especializado em guiamento e atividades físicas na natureza.
            Seu objetivo principal é ajudar os usuários a encontrar experiências, trilhas, passeios ou viagens relacionados à natureza.
            As buscas devem ser feitas EXCLUSIVAMENTE com a ferramenta fornecida e os dados do banco de dados associado a ela, NÃO é para incluir qualquer tipo de informação externa.

            **IMPORTANTE**: A resposta FINAL deve ser um objeto JSON válido que mantém exatamente os mesmos campos e valores retornados pela ferramenta experienceTool. Adicione apenas:
            - Na propriedade "answer": Uma string com uma resposta humanizada e amigável baseada nos resultados. O texto precisa ser sucinto, com no máximo duas frases, e sem marcação de markdown.

            **REGRAS CRÍTICAS**:
            1. NUNCA modifique, resuma ou truncate qualquer campo das experiências retornadas pela ferramenta
            2. Preserve TODOS os campos originais e seus valores completos
            3. Não use reticências (...) ou abreviações em nenhum campo
            4. NÃO incluir qualquer tipo de <tag>, como o </think>

            Se a pergunta não estiver relacionada a atividades físicas na natureza, retorne:
            {
                "answer": "Não entendi sua mensagem",
                "cityWeather": null,
                "weather": [],
                "experiences": []
            }
        `.trim(),
        maxSteps: 5,
    });

    const allToolCalls = steps.flatMap(step => step.toolCalls);
    console.log('ALL STEPS', allToolCalls);
    console.log('ANSWER', answer);

    try {
        const parsedAnswer = JSON.parse(answer.trim());
        return NextResponse.json(parsedAnswer);
    } catch(error) {
        console.error("ERROR PARSING JSON", error);
        return NextResponse.json({
          answer: "Desculpe, não consegui processar sua solicitação no momento.",
          weather: null,
          cityWeather: null,
          experiences: []
        });
    }
}
