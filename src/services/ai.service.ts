import api from "@/lib/api";

export async function aiService(message: string) {
    try {
        const { data } = await api.post('/chat', { message });
        return data;
    } catch (error) {
        console.error('Erro ao buscar a lista de eventos:', error);
        throw error;
    }
}
