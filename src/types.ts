export type Experience = {
    id: string;
    name: string;
    description: string;
    slug: string;
    city: string;
    state: string;
    distance: number;
    elevation: number;
    duration: number;
    level: 'strong' | 'moderate' | 'light' | 'walkway';
    imageUrl: string; 
    park: string;
    score: string;
    tags: string[];
}

export type Weather = {
    date: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    description: string;
    icon: string;
}