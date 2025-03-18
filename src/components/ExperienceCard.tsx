import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogTitle,
    MorphingDialogImage,
    MorphingDialogSubtitle,
    MorphingDialogClose,
    MorphingDialogDescription,
    MorphingDialogContainer,
  } from "@/components/ui/morphing-dialog";
  import { PlusIcon } from "lucide-react";
  import { Experience } from "@/types";
import { formatDuration } from "@/utils/format";
import ReactMarkdown from "react-markdown";


  const placeholder = "https://images.unsplash.com/photo-1530461215976-31923a646c83?q=80&w=2988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const levelLabel = {
    'light': 'leve',
    'moderate': 'moderado',
    'strong': 'pesado',
    'walkway': 'passeio'
  }

  export function ExperienceCard({ card }: { card: Experience }) {
    return (
      <MorphingDialog
        transition={{
          type: "spring",
          bounce: 0.05,
          duration: 0.25,
        }}
      >
        <MorphingDialogTrigger
          style={{
            borderRadius: "12px",
          }}
          className="flex flex-col h-[260px] overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
        >
          <MorphingDialogImage
            src={card.imageUrl || placeholder}
            alt={card.slug}
            className="h-48 w-full object-cover"
          />
          <div className="flex flex-grow flex-row items-center justify-between p-2">
            <div>
              <MorphingDialogTitle className="text-zinc-950 font-serif dark:text-zinc-50 leading-[0.98]">
                { card.name }
              </MorphingDialogTitle>
            </div>
            <button
              type="button"
              className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
              aria-label="Open dialog"
            >
              <PlusIcon size={12} />
            </button>
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer className="w-full">
          <MorphingDialogContent
            style={{
              borderRadius: "24px",
            }}
            className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[700px]"
          >
            <MorphingDialogImage
              src={card.imageUrl || placeholder}
              alt={card.slug}
              className="h-56 w-full object-cover"
            />
            <div className="px-6 pt-3 pb-6">
              <MorphingDialogTitle className="text-2xl font-serif text-zinc-950 dark:text-zinc-50">
                { card.name }
              </MorphingDialogTitle>
              <MorphingDialogSubtitle className="text-zinc-700 dark:text-zinc-400 flex justify-between items-center">
                <span>Nível <strong>{ levelLabel[card.level] }</strong></span>
                <span className="inline-flex mt-2">
                    {card.tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-200 mr-2 rounded-sm text-sm">{tag}</span>
                    ))}
                </span>
              </MorphingDialogSubtitle>
                <div className="mt-2">
                    {card.distance && <p><strong>Distância:</strong> {card.distance} km</p>}
                    {card.duration && <p><strong>Duração:</strong> {formatDuration(card.duration)}</p>}
                    {card.elevation > 0 && <p> <strong>Elevação:</strong> {card.elevation} metros</p>}
                </div>
              <MorphingDialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
              >
                <div 
                    className="mt-2 text-zinc-500 dark:text-zinc-500 [&>p]:mt-2.5">
                      <ReactMarkdown>{card.description}</ReactMarkdown>
                </div>
              </MorphingDialogDescription>
            </div>
            <MorphingDialogClose className="text-zinc-50" />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    );
  }  
