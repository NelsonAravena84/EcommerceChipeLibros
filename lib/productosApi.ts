import axios from 'axios';

const api = axios.create({
  baseURL:process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL,
});

export const obtenerProductos = async () => {
  try {
    const response = await api.get('/api/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const obtenerProductosPorCategoria = async (categoriaId: number) => {
  try {
    const response = await api.get('/api/productos/por-categoria', {
      params: { categoria: categoriaId },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};

export const obtenerProductoPorID = async (product_id: number) =>{
  try{
    const response = await api.get('/api/productos/producto', {
      params: {id: product_id},
    });
    return response.data;
  } catch (error){
    console.error('Error al obtener el producto por su ID', error);
    throw error;
  }
}