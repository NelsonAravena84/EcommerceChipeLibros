'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip } from '@mui/material';
import { CartPlus, Heart, EmojiSad } from 'iconoir-react';
import Link from 'next/link';
import { obtenerProductos } from '@/app/api/productosApi';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  precio_final?: number;
  categoria?: string;
  image_url?: string;
  rating?: number;
}

function ProductCard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (err) {
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {productos.map((producto) => (
        <Card key={producto.id} sx={{ maxWidth: 320, width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
          <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
            <Heart />
          </Box>

          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={producto.image_url || 'https://via.placeholder.com/300x260'}
              alt={producto.nombre || 'Producto'}
              sx={{ height: 260 }}
            />
          </Box>

          <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 2 }}>
            <Chip label={producto.categoria || 'Categoría'} size="small" sx={{ mb: 0.5, height: 20, backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 500, fontSize: '0.675rem' }} />

            <Link href={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                {producto.nombre || 'Producto'}
              </Typography>
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Rating value={producto.rating || 0} readOnly size="small" />
              <Typography variant="body2" sx={{ ml: 0.5, fontSize: '0.7rem', color: '#64748B' }}>
                ({producto.rating || 0}.0)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                ${producto.precio_final?.toLocaleString() || producto.precio.toLocaleString()}
              </Typography>
              {producto.precio_final && (
                <Typography variant="body2" sx={{ color: '#6B7280', textDecoration: 'line-through' }}>
                  ${producto.precio.toLocaleString()}
                </Typography>
              )}
            </Box>

            <Button variant="contained" sx={{ backgroundColor: 'white', width: '100%', mt: 2, fontWeight: 600, fontSize: '0.9rem', color: 'black', textTransform: 'none' }} endIcon={<CartPlus />}>
              Añadir al carrito
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ProductCard;
