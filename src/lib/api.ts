import axios from 'axios';
import { convertKeysToCamelCase } from '@/utils/format';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 20000,
});

// Função para converter camelCase para snake_case
const toSnakeCase = (str: string) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

// Interceptor de resposta
api.interceptors.response.use((response) => {
    if (response.data) {
        response.data = convertKeysToCamelCase(response.data);
    }
    return response;
});

// Interceptor de requisição
api.interceptors.request.use((config) => {
    if (config.data) {
        if (Array.isArray(config.data)) {
            // Se for um array, converter as chaves de cada objeto
            config.data = config.data.map(item => {
                const convertedItem: { [key: string]: unknown } = {};
                for (const key in item) {
                    convertedItem[toSnakeCase(key)] = item[key];
                }
                return convertedItem;
            });
        } else {
            // Se for um objeto, converter as chaves diretamente
            const convertedData: { [key: string]: unknown } = {};
            for (const key in config.data) {
                convertedData[toSnakeCase(key)] = config.data[key];
            }
            config.data = convertedData;
        }
    }
    return config;
});

export default api;
