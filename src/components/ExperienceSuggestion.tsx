import ExperienceList from "./ExperienceList";
import WeatherCard from "./WeatherCard";
import { Experience, Weather } from "@/types";

interface SuggestionProps {
    cityWeather: string;
    weather: Weather[];
    experiences: Experience[];
}

export default function ExperienceSuggestion({ cityWeather, weather, experiences }: SuggestionProps) {
    return (
        <ExperienceList cards={experiences ?? []} />
    )
}