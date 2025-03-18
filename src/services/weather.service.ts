import api from "@/lib/api";
import { formatDate } from "@/utils/format";

interface WeatherProps {
    validDate: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    weather: {
        description: string;
        icon: string;
    }
}

export async function getWeatherService({city, days}: {city: string, days: number}) {
    try {
        const { data } = await api({
            method: 'GET',
            url: `/forecast/daily?lang=pt&key=${process.env.NEXT_PUBLIC_API_WEATHERBIT}&days=${days}&city=${city}`,
            baseURL: process.env.NEXT_PUBLIC_API_WEATHER_URL,
        });
        
        // slice para evitar o dia de ontem
        const filteredData = data.data.slice(1).map((item: WeatherProps) => {
            return {
                date: formatDate(item.validDate),
                temp: Math.round(item.temp),
                minTemp: Math.round(item.minTemp),
                maxTemp: Math.round(item.maxTemp),
                description: item.weather.description,
                icon: item.weather.icon,
            }
        });
    
        return filteredData;
    } catch (error) {
        console.error('Erro ao buscar a lista de eventos:', error);
        throw error;
    }
}
