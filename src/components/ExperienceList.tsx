"use client";
import { ExperienceCard } from "./ExperienceCard";
import { Experience } from "@/types";

export default function ExperienceList({cards}: {cards: Experience[]}) {

  return (
    <>
      {cards.map((card, idx) => (
          <ExperienceCard key={idx} card={card} />
      ))}
    </>
  );
}
