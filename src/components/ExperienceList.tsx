"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { ExperienceCard } from "./ExperienceCard";
import { Experience } from "@/types";

export default function ExperienceList({
  cards,
  className,
  filter = true,
  duration = 0.5,
}: {
  cards: Experience[];
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (scope.current) {
      animate(
        scope.current.querySelectorAll("span"),
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    }
  }, [scope, animate, duration, filter]);

  return (
    <motion.div className={`grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-6 ${className}`} ref={scope}>
      {cards.map((card, idx) => (
        <motion.span
          key={idx}
          className="dark:text-white text-black opacity-0 mt-6"
          style={{
            filter: filter ? "blur(10px)" : "none",
          }}
        >
          <ExperienceCard card={card} />
        </motion.span>
      ))}
    </motion.div>
  );
}
