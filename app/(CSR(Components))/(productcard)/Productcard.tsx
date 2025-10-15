'use client'

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip } from '@mui/material';
import { CartPlus, Heart, EmojiSad } from 'iconoir-react';
import Link from 'next/link';


function ProductCard() {
  return (
    <Card 
      sx={{ 
        maxWidth: 320, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        fontFamily: "Lexend, sans-serif",
      }}
    >

      {/* Ícono de favorito */}
      <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
        <Heart />
      </Box>

      {/* Etiqueta de Agotado */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: {xs: '5%', sm:'37%'},
          zIndex: 2,
          background: '#424242',
          color: 'white',
          border: '2px solid rgb(255, 255, 255)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <EmojiSad color="white" height="16px" width="16px" />
        <Typography sx={{ fontWeight: 'inherit', fontSize: '0.75rem' }}>
          Agotado
        </Typography>
      </Box>

      {/* Imagen del producto */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image="https://via.placeholder.com/300x260"
          alt="Nombre del producto"
          sx={{ height: 260 }}
        />
      </Box>

      {/* Contenido de la tarjeta */}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 2 }}>
        <Box>
          <Chip 
            label="Categoría" 
            size="small" 
            sx={{ 
              mb: 0.5,
              height: '20px',
              backgroundColor: '#E0F2FE',
              color: '#0369A1',
              fontWeight: 500,
              fontSize: '0.675rem',
            }} 
          />

          <Box sx={{ mb: 1 }}>
            <Link href={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  lineHeight: 1.2,
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                }}
              >
                Nombre del producto
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* Calificación */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Rating value={4} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 0.5, fontSize: '0.7rem', color: '#64748B' }}>
            (4.0)
          </Typography>
        </Box>

        {/* Precio */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            $25.000
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', textDecoration: 'line-through' }}>
            $30.000
          </Typography>
        </Box>

        {/* Botón */}
        <Button 
          variant="contained"
          sx={{ 
            backgroundColor: 'white',
            width: '100%',
            mt: 2,
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'black',
            textTransform: 'none',
          }}
          endIcon={<CartPlus />}
        >
          Añadir al carrito
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
