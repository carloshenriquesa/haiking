export function formatDate(arg: Date | string, toUrl: boolean = false): string {
    if (!arg) return '';
    
    const date = new Date(arg);
    
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
        return '';
    }
    if (toUrl) {
        return Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date).split('/').join('-');
    }
    return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

type SnakeCaseValue = string | number | boolean | null | SnakeCaseObject | SnakeCaseArray;
type SnakeCaseObject = { [key: string]: SnakeCaseValue };
type SnakeCaseArray = SnakeCaseObject[];

type CamelCaseValue = string | number | boolean | null | CamelCaseObject | CamelCaseArray;
type CamelCaseObject = { [key: string]: CamelCaseValue };
type CamelCaseArray = CamelCaseObject[];

// Função para converter snake_case para camelCase
const toCamelCase = (str: string) => {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const convertKeysToCamelCase = (data: SnakeCaseValue): CamelCaseValue => {
    if (Array.isArray(data)) {
        return data.map(item => convertKeysToCamelCase(item) as CamelCaseObject) as CamelCaseArray;
    } else if (data !== null && typeof data === 'object') {
        const convertedData: CamelCaseObject = {};
        for (const key in data) {
            convertedData[toCamelCase(key)] = convertKeysToCamelCase((data as SnakeCaseObject)[key]);
        }
        return convertedData;
    }
    return data;
};

export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
}
  