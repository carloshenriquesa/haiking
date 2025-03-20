import { CircleArrowUp } from "lucide-react";
import Image from "next/image";

export interface WeatherCardProps {
    icon: string;
    description: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    date: string;
}

export default function WeatherCard({weather}: {weather: WeatherCardProps}) {
  return (
    <div className="relative flex w-full flex-col border rounded-2xl p-3 border-gray-200">
      <div className="flex flex-1 flex-col gap-1 dark:text-white">
        <p className="city opacity-70">{weather.date}</p>
        <div className="flex items-center">
          <Image width={32} height={32} className="w-9" src={`https://cdn.weatherbit.io/static/img/icons/${weather.icon}.png`} alt={weather.description} />
          <p className="text-2xl font-bold ml-4">{weather.temp}&deg;</p>
        </div>
        <p className="text-sm mb-2">
          {weather.description}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1 text-orange-500">
          <CircleArrowUp className="h-5 w-5" />
          {weather.maxTemp}&deg;
        </div>
        <div className="flex items-center gap-1 text-blue-500">
          <CircleArrowUp className="h-5 w-5 rotate-180" />
          {weather.minTemp}&deg;
        </div>
      </div>
    </div>
  );
}
