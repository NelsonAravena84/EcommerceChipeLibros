'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip } from '@mui/material';
import { CartPlus, Heart } from 'iconoir-react';
import Link from 'next/link';
import { obtenerProductos } from '@/app/api/productosApi';
import { useCart } from '@/app/context/CartContext';

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

  const { addToCart } = useCart(); // ✅ usamos el contexto del carrito

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
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      {productos.map((producto) => (
        <Card
          key={producto.id}
          sx={{
            flex: '1 1 20%',
            maxWidth: 320,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            borderRadius: 3,
          }}
        >
          {/* Ícono de favorito */}
          <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
            <Heart />
          </Box>

          {/* Imagen del producto */}
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={producto.image_url || 'https://via.placeholder.com/300x260'}
              alt={producto.nombre || 'Producto'}
              sx={{ height: 390, objectFit: 'cover' }}
            />
          </Box>

          {/* Contenido del producto */}
          <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 2 }}>
            <Chip
              label={producto.categoria || 'Categoría'}
              size="small"
              sx={{
                mb: 0.5,
                height: 20,
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 500,
                fontSize: '0.675rem',
              }}
            />

            <Link
              href={`/producto/${producto.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: { xs: '0.95rem', sm: '1.1rem' }, mt: 2 }}
              >
                {producto.nombre || 'Producto'}
              </Typography>
            </Link>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Rating value={producto.rating || 0} readOnly size="small" />
              <Typography
                variant="body2"
                sx={{ ml: 0.5, fontSize: '0.7rem', color: '#64748B' }}
              >
                ({producto.rating || 0}.0)
              </Typography>
            </Box>

            {/* Precio */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                ${producto.precio_final?.toLocaleString() || producto.precio.toLocaleString()}
              </Typography>
              {producto.precio_final && (
                <Typography
                  variant="body2"
                  sx={{ color: '#6B7280', textDecoration: 'line-through', textAlign: 'start' }}
                >
                  ${producto.precio.toLocaleString()}
                </Typography>
              )}
            </Box>

            {/* ✅ Botón con addToCart */}
            <Button
              variant="contained"
              onClick={() =>
                addToCart({
                  id: producto.id,
                  name: producto.nombre,
                  price: producto.precio_final || producto.precio,
                })
              }
              sx={{
                backgroundColor: 'white',
                width: '100%',
                mt: 2,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'black',
                textTransform: 'none',
                border: '1px solid #e5e5e5',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
              endIcon={<CartPlus />}
            >
              Añadir al carrito
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ProductCard;
