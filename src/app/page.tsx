'use client';

import React, { useState } from 'react';
import AiInput from "@/components/ui/AiInput";
import { useChat } from '@ai-sdk/react'
import ExperienceSuggestion from '@/components/ExperienceSuggestion';
import ReactMarkdown from 'react-markdown';
import TextShimmer from '@/components/ui/text-shimmer';
import ExperienceList from '@/components/ExperienceList';

export default function Page() {
    const [placeholders, setPlaceholders] = useState([
        "Bora fazer uma trilha leve no Rio?",
        "Um lugar secreto com cachoeiras, quem sabe?",
        "Partiu trilhar em Minas Gerais?",
        "Me conta qual sua próxima aventura na natureza.",
        "Quero trilhas com visual incrível!",
        "Uma trilha com aquele visual para recarregar as energias?",
    ]);

    const { messages, input, handleInputChange, handleSubmit } = useChat();

    console.log(messages);

    return (
        <div className="flex flex-col max-w-[900px] m-auto">
            <div className='flex flex-col overflow-scroll h-[calc(100vh-80px)]'>
                {messages.map(message => (
                    <div className='mt-4' key={message.id}>
                        {message.role === 'user' &&
                            <div className='bg-slate-100 p-4 rounded-sm'>{message.content}</div>
                        }
                        {message.role === 'assistant' &&
                            <div className='my-4'>
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        }

                        <div key={`parts_message_${message.id}`} className='grid grid-cols-3 gap-4'>
                            {message.parts?.map((part, index) => {
                                if (part.type === "tool-invocation") {
                                    const { toolName, toolCallId, state } = part.toolInvocation;
        
                                    if (state === 'result') {
                                        if (toolName === 'experienceTool') {
                                        const { result } = part.toolInvocation;
                                        return (
                                            <ExperienceList cards={result} />
                                        );
                                        }
                                    } else {
                                        return (
                                        <div key={toolCallId}>
                                            {toolName === 'experienceTool' ? (
                                            <TextShimmer>Pensando...</TextShimmer>
                                            ) : null}
                                        </div>
                                        );
                                    }
                                }
                            })}
                        </div>
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
