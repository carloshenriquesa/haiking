"use client";
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  
  const spanVariants = {
    hidden: { opacity: 0, filter: filter ? "blur(10px)" : "none" },
    visible: {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
      transition: {
        duration: duration,
        delay: 0.2,
      },
    },
  };

  const renderWords = () => {
    return (
      <motion.div 
        initial="hidden"
        animate="visible">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black"
              variants={spanVariants}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-normal", className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
