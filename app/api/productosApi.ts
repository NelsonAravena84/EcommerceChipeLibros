import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // apuntando a /api
});

export const obtenerProductos = async () => {
    try {
        const response = await api.get('/productos'); // GET http://localhost:3000/api/productos
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}