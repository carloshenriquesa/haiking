'use client';

import { useRef, useState } from 'react';
import { aiService } from "@/services/ai.service";
import { Experience, Weather } from "@/types";
import AiInput from "@/components/ui/AiInput";
import TextShimmer from "@/components/ui/text-shimmer";
import TextGenerateEffect from "@/components/ui/text-generate-effect";
import ExperienceList from '@/components/ExperienceList';
import { Edit2 } from 'lucide-react';
import WeatherCard from '@/components/WeatherCard';

interface AiResponse {
    answer: string;
    cityWeather: string;
    weather: Weather[];
    experiences: Experience[];
}

const Page = () => {
    const [placeholders, setPlaceholders] = useState([
        "Bora fazer uma trilha leve no Rio?",
        "Um lugar secreto com cachoeiras, quem sabe?",
        "Partiu trilhar em Minas Gerais?",
        "Me conta qual sua próxima aventura na natureza.",
        "Quero trilhas com visual incrível!",
        "Uma trilha com aquele visual para recarregar as energias?",
    ]);
    const [prompt, setPrompt] = useState('');
    const [question, setQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState<AiResponse>();
    const [loading, setLoading] = useState(false);
    const [loadingExperience, setLoadingExperience] = useState(false);
    const scope = useRef(null);

    async function handleChatbotResponse() {
        let timer = 0;
        setQuestion(prompt);
        try {
            setLoading(true);
            setLoadingExperience(true);
            setPlaceholders([]);
            const response = await aiService(prompt);
            setAiResponse(response);
            timer = ((response?.answer?.split(" ").length) * 210);
        } catch (error) {
            console.error('Erro ao buscar a lista de eventos:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setLoadingExperience(false); 
            }, timer);
        }
    }

    function handleEditQuestion() {
        setQuestion('');
    }

    return (
        <div className="flex flex-col p-6 mt-10 max-w-[800px] m-auto" ref={scope}>
            <div className="flex justify-center items-center">
                {!!!question && (
                    <AiInput
                        prompt={prompt}
                        placeholders={placeholders}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrompt(event.target.value)}
                        onSubmit={handleChatbotResponse} />
                )}

                {!!question && (
                    <p className='flex justify-between w-full text-normal font-medium bg-slate-100 text-slate-500 rounded-md p-4'>
                        {question}
                        <Edit2 className='w-5 cursor-pointer' onClick={handleEditQuestion} />
                    </p>
                )}
            </div>

            {!loading && (aiResponse?.weather?.length ?? 0) > 0 && (
                <section className='opacity-50 hover:opacity-100 transition-all mb-4'>
                    <p className='mt-6'>Previsão do tempo nos próximos dias, em <strong>{aiResponse?.cityWeather}:</strong></p>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                        {aiResponse?.weather.map((weather, index) => (
                            <WeatherCard key={index} weather={weather} />
                        ))}
                    </div>
                </section>
            )}

            {loading && (
                <div className="flex justify-center items-center mt-6">
                    <TextShimmer
                        duration={1.2}
                        className='text-sm font-medium [--base-color:theme(colors.gray.600)] [--base-gradient-color:theme(colors.gray.200)] dark:[--base-color:theme(colors.gray.700)] dark:[--base-gradient-color:theme(colors.gray.400)]'
                    >
                        Pensando...
                    </TextShimmer>
                </div>
            )}

            {!loading && aiResponse?.answer && (
                <div className="flex justify-center items-center">
                    <TextGenerateEffect duration={0.4} filter={false} words={aiResponse.answer} />
                </div>
            )}

            {!loadingExperience && (aiResponse?.experiences?.length ?? 0) > 0 && (
                <ExperienceList duration={0.4} cards={aiResponse?.experiences ?? []} />
            )}
        </div>
    );
};

export default Page;
