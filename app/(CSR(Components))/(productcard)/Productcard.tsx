'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip } from '@mui/material';
import { CartPlus, Heart } from 'iconoir-react';
import Link from 'next/link';
import { obtenerProductosPorCategoria } from '@/lib/productosApi';
import { useCart } from '@/app/context/CartContext';

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, '');
};

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
        gap: { xs: 1, sm: 1.5, md: 2 }, 
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(4, 1fr)'
        },
        justifyItems: "center",
        alignItems: "stretch",
        px: 0,
        py: 0
      }}
    >
      {productos.map((producto) => {
        const slug = createSlug(producto.nombre);

        return (
          <Card
            key={producto.id}
            sx={{
              maxWidth: { xs: 165, sm: 190, md: 220, lg: 240 },
              minWidth: { xs: 145, sm: 160, md: 180, lg: 200 },

              width: '100%',
              display: "flex",
              flexDirection: "column",
              position: "relative",

              minHeight: { xs: 300, sm: 340, md: 370, lg: 400 },

              boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
              borderRadius: 3,

              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: "0 6px 18px rgba(51,51,80,0.15)",
                transform: "translateY(-4px) scale(1.03)"
              },
              bgcolor: "white"
            }}
          >

            {/* Ícono favorito */}
            <Box sx={{ position: 'absolute', top: 8, left: 10, zIndex: 2 }}>
              <Heart width={18} height={18} />
            </Box>

            {/* Imagen */}
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={producto.image_url || 'https://via.placeholder.com/400x600'}
                alt={producto.nombre}
                sx={{
                  width: "100%",
                  aspectRatio: "3 / 4",          // 👈 Proporción real de libro
                  objectFit: "contain",          // 👈 NO corta la imagen
                  backgroundColor: "#ffffff",    // 👈 Para que se vea como portada real
                  padding: 1.5,                  // 👈 Deja borde alrededor
                  borderRadius: 2,               // 👈 Bordes suaves estilo libro
                  border: "1px solid #e5e7eb",   // 👈 Simula el filo de la portada
                  transition: 'transform 0.12s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              />
            </Box>

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: 1.5,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Chip
                label={producto.categoria || 'Sin categoría'}
                size="small"
                sx={{
                  mb: 0.5,
                  height: 20,
                  backgroundColor: 'black',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px'
                }}
              />

              <Link
                href={`/detalle-producto/${producto.id}/${slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.15,
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                    mt: 1,
                    mb: 0.5,
                    color: "#0F172A"
                  }}
                >
                  {producto.nombre}
                </Typography>
              </Link>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Rating value={producto.rating || 0} readOnly size="small" />
                <Typography
                  variant="body2"
                  sx={{ ml: 0.3, fontSize: '0.7rem', color: '#64748B' }}
                >
                  ({producto.rating?.toFixed(1) || '0.0'})
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 0.5,
                  flexWrap: "wrap"
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: "#111827" }}>
                  ${(producto.precio_final ?? producto.precio).toLocaleString()}
                </Typography>

                {producto.precio_final && (
                  <Typography
                    variant="body2"
                    sx={{ color: '#6B7280', textDecoration: 'line-through', fontSize: '0.75rem' }}
                  >
                    ${producto.precio.toLocaleString()}
                  </Typography>
                )}
              </Box>

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
                  mt: 1.5,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  py: 0.5,
                  color: '#161A2B',
                  textTransform: 'none',
                  border: '1px solid #e2e8f0',
                  boxShadow: "0 1px 5px rgba(163,163,163,0.06)",
                  '&:hover': { backgroundColor: '#F3F4F6', color: '#111827' },
                }}
                endIcon={<CartPlus width={16} height={16} />}
              >
                Añadir al carrito
              </Button>

            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

export default ProductCard;
