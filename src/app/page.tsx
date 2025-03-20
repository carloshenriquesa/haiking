'use client';

import React, { useState } from 'react';
import AiInput from "@/components/ui/AiInput";
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown';
import TextShimmer from '@/components/ui/text-shimmer';
import ExperienceList from '@/components/ExperienceList';
import WeatherCard, { WeatherCardProps } from '@/components/WeatherCard';
import { Experience } from '@/types';

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

    const [aiMessageList, setAitMessageList] = useState<ChatMessageProps[]>([]);
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        async onToolCall() {
            setAitMessageList((value) => [...value, { input, output: { message: '', cityWeather: '', weatherData: [], experiences: [] } }]);
            console.log('ON_TOOL_CALL', input)
        },
        async onFinish(message) {
            console.log('ON_FINISH', message);
            console.log('ON_FINISH_INPUT', input);
        },
        async onError(error) {
            console.log('ON_ERROR', error);
        }
    });

    return (
        <div className="flex flex-col max-w-[900px] m-auto">
            <div className='flex flex-col overflow-scroll h-[calc(100vh-80px)]'>
                {messages.map((message, index) => (
                    <div className='mt-4' key={index}>
                        {message.role === 'user' &&
                            <div className='bg-slate-100 p-4 rounded-sm'>{message.content}</div>
                        }

                        {message.role === 'assistant' && 
                            <div>
                                {message.parts?.map((part, index) => (
                                    <div key={index}>
                                        {part.type === "tool-invocation" && (() => {
                                            const { toolName, toolCallId, state } = part.toolInvocation;
                
                                            if (state === 'result') {
                                                if (toolName === 'weatherTool') {
                                                    const { result } = part.toolInvocation;
                                                    return (
                                                        <div key={toolCallId}>
                                                            <p className='mb-2'>Previsão do tempo para <strong>{result.cityWeather}</strong></p>
                                                            {result.weatherData.map((weather: WeatherCardProps, index: number) => (
                                                                <WeatherCard key={index} weather={weather} />
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                                if (toolName === 'experienceTool') {
                                                    const { result } = part.toolInvocation;
                                                    return (
                                                        <ExperienceList cards={result} />
                                                    );
                                                }
                                            } else {
                                                return (
                                                <div key={`${toolCallId}_loading`}>
                                                    {toolName === 'experienceTool' ? (
                                                        <TextShimmer>Pensando...</TextShimmer>
                                                    ) : null}
                                                </div>
                                                );
                                            }
                                        })()}

                                        {part.type === "text" && (
                                            <div>
                                                <ReactMarkdown>{part.text}</ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                ))}
            </div>

            <div className="w-full h-[80px] bg-white flex justify-center items-center">
                <AiInput
                    placeholders={placeholders}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                    onSubmit={handleSubmit} />
            </div>
        </div>
    );
}
