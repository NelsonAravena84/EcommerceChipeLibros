'use client';
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { useCart } from '@/app/context/CartContext';
import { XmarkCircle, MinusCircle, PlusCircle } from 'iconoir-react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export default function DrawerCarrito({ isOpen, onClose }: Props) {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      hideBackdrop={false}
      PaperProps={{
        sx: {
          zIndex: 1600, // 👈 agregado para estar sobre otros elementos
          backgroundColor: '#322F2F',
          color: 'white',
        },
      }}
    >
      <Box
        sx={{
          width: 370,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          Carrito de compras
        </Typography>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <Box>
              <Typography
                variant="body1"
                sx={{ textAlign: 'center', mt: 4, color: 'gray' }}
              >
                Carrito vacío.
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', mt: 2, color: 'gray' }}
              >
                (Añade productos para comprar)
              </Typography>
            </Box>
          ) : (
            <List>
              {cart.map((product, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: 'white' }}
                      >
                        {product.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body1" sx={{ color: 'gray' }}>
                          ${product.price.toLocaleString('es-CL')}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'white',
                            mt: 0.5,
                            fontWeight: 'bold',
                          }}
                        >
                          Cantidad: {product.quantity}
                        </Typography>
                      </>
                    }
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      mt: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PlusCircle
                        height={30}
                        width={30}
                        style={{ cursor: 'pointer' }}
                        onClick={() => increaseQuantity(product.id)}
                      />
                      <MinusCircle
                        height={30}
                        width={30}
                        style={{ cursor: 'pointer' }}
                        onClick={() => decreaseQuantity(product.id)}
                      />
                      <XmarkCircle
                        height={30}
                        width={30}
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeFromCart(product.id)}
                      />
                    </Box>
                  </Box>

                  <Divider
                    sx={{
                      width: '100%',
                      mt: 1,
                      borderColor: 'rgba(255,255,255,0.1)',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {cart.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
              Total: $
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toLocaleString('es-CL')}
            </Typography>
          
            <Link
              href={`/resume-cart/`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  color: 'white',
                  background: 'black',
                  '&:hover': { background: '#222' },
                }}
              >
                Continuar
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
