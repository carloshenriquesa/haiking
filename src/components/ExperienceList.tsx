"use client";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      className={`grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-6 ${className}`}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, idx) => (
        <motion.span
          key={idx}
          className="dark:text-white text-black mt-6"
          variants={spanVariants}
        >
          <ExperienceCard card={card} />
        </motion.span>
      ))}
    </motion.div>
  );
}
