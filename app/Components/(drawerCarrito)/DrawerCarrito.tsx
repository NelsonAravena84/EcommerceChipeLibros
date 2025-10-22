'use client';

import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemButton, Typography, Divider, Box, Button } from '@mui/material';
import { useCart } from '@/app/context/CartContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DrawerCarrito({ isOpen, onClose }: Props) {
  const { cart } = useCart();

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Carrito de compras
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            Tu carrito está vacío 💤
          </Typography>
        ) : (
          <List>
            {cart.map((product, index) => (
              <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                      ${product.price.toLocaleString('es-CL')}
                    </Typography>
                  }
                />
                <Divider sx={{ width: '100%', mt: 1 }} />
              </ListItem>
            ))}
          </List>
        )}

        {cart.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Total: $
              {cart.reduce((acc, item) => acc + item.price, 0).toLocaleString('es-CL')}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, color:'white' }}
              onClick={() => alert('Proceder al pago')}
            >
              Continuar
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
}
