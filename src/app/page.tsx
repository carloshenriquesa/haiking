'use client';

import React, { useRef, useState } from 'react';
import AiInput from "@/components/ui/AiInput";
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown';
import TextShimmer from '@/components/ui/text-shimmer';
import ExperienceList from '@/components/ExperienceList';
import WeatherCard, { WeatherCardProps } from '@/components/WeatherCard';
import { Experience } from '@/types';
import TextGenerateEffect from '@/components/ui/text-generate-effect';

interface WeatherProps {
    cityWeather: string;
    weatherData: WeatherCardProps[];
}

interface OutputProps {
    message: string;
    cityWeather: string;
    weatherData: WeatherCardProps[];
    experiences: Experience[];
}

interface ChatMessageProps {
    input: string;
    output: OutputProps;
}

export default function Page() {

    const placeholders = [
        "Bora fazer uma trilha leve no Rio?",
        "Um lugar secreto com cachoeiras, quem sabe?",
        "Partiu trilhar em Minas Gerais?",
        "Me conta qual sua próxima aventura na natureza.",
        "Quero trilhas com visual incrível!",
        "Uma trilha com aquele visual para recarregar as energias?",
    ];

    function filterWeatherTool(toolList: any) {
            const tool = toolList?.find((tool: any) => tool.toolName === 'weatherTool');
            try {
                return {
                    cityWeather: tool?.result.cityWeather,
                    weatherData: tool?.result.weatherData,
                } as WeatherProps;
            } catch {
                return {
                    cityWeather: '',
                    weatherData: [],
                };
            }
        }
    
    function filterExperienceTool(toolList: any): Experience[] {
            const tool = toolList?.find((tool: any) => tool.toolName === 'experienceTool');
            try {
                return tool?.result as Experience[];
            } catch {
                return [];
            }
        }

    const [aiMessageList, setAitMessageList] = useState<ChatMessageProps[]>([]);
    const [loading, setLoading] = useState(false);
    
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        async onToolCall() {
            console.log('ON_TOOL_CALL', input)
        },
        async onFinish(message) {
            console.log('ON_FINISH', message);
            setAitMessageList((prevMessages) => {
                const updatedMessages = [...prevMessages];
                const lastMessageIndex = updatedMessages.length - 1;
                if (lastMessageIndex >= 0) {
                    updatedMessages[lastMessageIndex] = {
                        input: input,
                        output: {
                            message: message.content,
                            ...(filterWeatherTool(message.toolInvocations)),
                            experiences: filterExperienceTool(message.toolInvocations),
                        },
                    };
                }
                return updatedMessages;
            });

            setLoading(false);
        },
        async onError(error) {
            console.log('ON_ERROR', error);
            setLoading(false);
        }
    });

    const customHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        setAitMessageList((value) => [...value, { input, output: { message: '', cityWeather: '', weatherData: [], experiences: [] } }]);
        await handleSubmit(event);
    }

    return (
        <div className="flex flex-col max-w-[900px] m-auto">
            <div className='flex flex-col px-4 overflow-scroll h-[calc(100vh-80px)]'>
                {aiMessageList.map((message, index) => (
                    <div key={index}>
                        <p className='bg-slate-100 p-4 rounded-md my-4'>
                            {message.input}
                        </p>
                        
                        {loading && index === aiMessageList.length -1 && // Mostra o shimmer apenas para a última mensagem
                            <div className='flex justify-center my-4'>
                                <TextShimmer children='Pensando...' />
                            </div>
                        }

                        {!loading && 
                            <section>
                                <div className='flex flex-col my-4'>
                                    <TextGenerateEffect duration={0.4} filter={false} words={message.output.message} />
                                </div>

                                <div className='my-4'>
                                    {message.output.weatherData.length > 0 && (
                                        <>
                                            <p className='mb-2'>Previsão do tempo em <strong>{message.output.cityWeather}</strong></p>
                                            <div className='grid grid-cols-6 gap-2'>
                                                {message.output.weatherData?.map((weather, idx) => (
                                                    <WeatherCard key={idx} weather={weather} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <ExperienceList cards={message.output.experiences} />
                            </section>
                        }
                    </div>
                ))}
            </div>

            <div className="w-full h-[80px] bg-white flex justify-center items-center">
                <AiInput
                    placeholders={placeholders}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                    onSubmit={customHandleSubmit} />
            </div>
        </div>
    );
}
