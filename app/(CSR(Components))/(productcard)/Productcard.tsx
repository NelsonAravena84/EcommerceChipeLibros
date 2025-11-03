'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip } from '@mui/material';
import { CartPlus, Heart } from 'iconoir-react';
import Link from 'next/link';
import { obtenerProductosPorCategoria } from '@/app/api/productosApi';
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

interface ProductCardProps {
  categoriaId?: number;
}

function ProductCard({ categoriaId }: ProductCardProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductosPorCategoria(categoriaId!);
        setProductos(data);
      } catch (err) {
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [categoriaId]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box
      sx={{
        width: "100%",
        display: 'grid',
        gap: { xs: 4, md: 5, lg: 7, xl: 12 },
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)'
        },
        justifyItems: "center",
        alignItems: "stretch",
        px: { xs: 1, md: 0 },
        py: { xs: 2, md: 3, lg: 5 }
      }}
    >
      {productos.map((producto) => (
        <Card
          key={producto.id}
          sx={{
            maxWidth: { xs: 260, sm: 260, md: 260, lg: 260 },
            minWidth: { xs: 200, sm: 210, md: 210, lg: 210 },
            width: '100%',
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
            borderRadius: 4,
            minHeight: { xs: 420, md: 470, lg: 520 },
            transition: 'all 0.15s ease',
            '&:hover': {
              boxShadow: "0 8px 28px rgba(51,51,80,0.18)",
              transform: "translateY(-5px) scale(1.03)"
            },
            bgcolor: "white"
          }}
        >
          {/* Ícono de favorito */}
          <Box sx={{ position: 'absolute', top: 12, left: 14, zIndex: 2 }}>
            <Heart />
          </Box>

          {/* Imagen del producto */}
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={producto.image_url || 'https://via.placeholder.com/400x320'}
              alt={producto.nombre || 'Producto'}
              sx={{
                height: { xs: 210, sm: 220, md: 270, lg: 290 },
                width: "100%",
                objectFit: 'cover',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                transition: 'transform 0.10s',
                '&:hover': { transform: 'scale(1.04)' }
              }}
            />
          </Box>

          {/* Contenido */}
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            padding: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}>
            <Chip
              label={producto.categoria || 'Sin categoría'}
              size="small"
              sx={{
                mb: 0.5,
                height: 25,
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.94rem',
                letterSpacing: '1px'
              }}
            />

            <Link
              href={`/producto/${producto.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.18,
                  fontSize: { xs: '1rem', sm: '1.08rem', lg: '1.15rem', xl: '1.22rem' },
                  mt: 2,
                  mb: 1,
                  color: "#0F172A"
                }}
              >
                {producto.nombre || 'Producto'}
              </Typography>
            </Link>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, mt: 0.5 }}>
              <Rating value={producto.rating || 0} readOnly size="small" />
              <Typography
                variant="body2"
                sx={{ ml: 0.5, fontSize: '0.8rem', color: '#64748B' }}
              >
                ({producto.rating?.toFixed(1) || '0.0'})
              </Typography>
            </Box>

            {/* Precio */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mt: 1,
              flexWrap: "wrap"
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
                ${(producto.precio_final ?? producto.precio).toLocaleString()}
              </Typography>
              {producto.precio_final && (
                <Typography
                  variant="body2"
                  sx={{ color: '#6B7280', textDecoration: 'line-through' }}
                >
                  ${producto.precio.toLocaleString()}
                </Typography>
              )}
            </Box>

            {/* Botón añadir al carrito */}
            <Button
              variant="contained"
              onClick={() =>
                addToCart({
                  id: producto.id,
                  name: producto.nombre,
                  price: producto.precio_final ?? producto.precio,
                  quantity: 1
                })
              }
              sx={{
                backgroundColor: 'white',
                width: '100%',
                mt: 2.5,
                fontWeight: 700,
                fontSize: { xs: '0.9rem', md: '1.05rem' },
                color: '#161A2B',
                textTransform: 'none',
                border: '1.5px solid #e2e8f0',
                boxShadow: "0 2px 10px rgba(163,163,163,0.07)",
                '&:hover': { backgroundColor: '#F3F4F6', color: '#111827' },
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
