'use client';

import {
  Avatar,
  Badge,
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import UserIcon from '../(CSR(Components))/UserIcon';
import CartIcon from '../(CSR(Components))/CartIcon';
import HeartIcon from '../(CSR(Components))/HeartIcon';
import Link from 'next/link';
import { Facebook, Instagram, Search, Whatsapp } from 'iconoir-react';
import React, { useState } from 'react';
import Categorianav from '../(CSR(Components))/(categoriaNav)/Categorianav';
import { useRouter } from 'next/navigation';
import DrawerCarrito from '../Components/(drawerCarrito)/DrawerCarrito';
import { useCart } from '@/app/context/CartContext';

interface MyComponentProps {
  children: any;
}

export default function Layout({ children }: MyComponentProps) {
  const [navCategoriasisOpen, setnavCategoriasisOpen] = useState(false);
  const [drawerCarritoisOpen, setdrawerCarritoisOpen] = useState(false);
  const router = useRouter();
  const { cart } = useCart();

  const handleClicknavcatagorias = () => {
    setnavCategoriasisOpen(prev => !prev);
  };

  const handleClicknavAcceso = () => {
    router.push('/login');
  };

  const handleClickDrawerOpen = () => {
    setdrawerCarritoisOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1100,
          backgroundColor: 'white',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        {/* Sección principal del navbar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 15,
            py: 2,
          }}
        >
          {/* 🔍 Buscador */}
          <Box sx={{ width: '25%' }}>
            <TextField
              fullWidth
              placeholder="Buscar producto..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search width={20} height={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* 🧾 Logo */}
          <Box sx={{pr:12}}>
            <Image
              src="/IconLogo.webp"
              alt="logo de la pagina"
              width={290}
              height={70}
              priority
            />
          </Box>

          {/* 👤 Acceso / ❤️ Favoritos / 🛒 Carrito */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Acceso */}
            <Box
              onClick={handleClicknavAcceso}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography variant="body1" sx={{ color: '#000', mr: 1 }}>
                Acceso
              </Typography>
              <UserIcon />
            </Box>

            {/* Carrito con badge dinámico */}
            <Box onClick={handleClickDrawerOpen} sx={{ cursor: 'pointer' }}>
              <Badge
                badgeContent={cart.length}
                color="error"
                invisible={cart.length === 0}
              >
                <CartIcon />
              </Badge>

              {/* Drawer del carrito */}
              <DrawerCarrito
                isOpen={drawerCarritoisOpen}
                onClose={() => setdrawerCarritoisOpen(false)}
              />
            </Box>

            {/* Favoritos */}
            <HeartIcon />
          </Box>
        </Box>

        {/* 🔻 Menú inferior */}
        <Box sx={{ backgroundColor: '#322F2F', py: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 5,
              p:4,
              color: '#fff',
              fontWeight: 500,
            }}
          >
            <Link href={'/'} style={{ color: 'white', textDecoration: 'none' }}>
              INICIO
            </Link>
            <Box
              onClick={handleClicknavcatagorias}
              sx={{ cursor: 'pointer', color: 'white' }}
            >
              CATEGORÍAS
            </Box>
            <Link
              href={'/destacados'}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              DESTACADOS
            </Link>
            <Link
              href={'/buscar-pedido'}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              BUSCAR PEDIDO
            </Link>
          </Box>
        </Box>

        <Categorianav isOpen={navCategoriasisOpen} />
      </Box>

      {/* ✅ Margen superior para que el contenido no quede tapado */}
      <Box sx={{ pt: 25 }}>{children}</Box>

      {/* 🔻 Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#322F2F',
          color: 'white',
          mt: 9,
          py: 4,
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 5, xl: 20 }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* 🏷️ Info */}
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 250 } }}>
            <Image
              src="/LogoPagina.webp"
              alt="logo de la pagina"
              width={300}
              height={70}
              priority
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              En Chipe Libros te acercamos a nuevas historias: literatura,
              filosofía, historia y mucho más. Envíos a todo Chile, compra
              segura, rápida y sin complicaciones.
            </Typography>
            <Box sx={{ display: 'flex', mt: 4, gap: 3 }}>
              <Avatar alt="Facebook" sx={{ width: 60, height: 60 }}>
                <Facebook color="black" height={30} width={30} />
              </Avatar>
              <Avatar alt="Instagram" sx={{ width: 60, height: 60 }}>
                <Instagram color="black" height={30} width={30} />
              </Avatar>
              <Avatar alt="Whatsapp" sx={{ width: 60, height: 60 }}>
                <Whatsapp color="black" height={30} width={30} />
              </Avatar>
            </Box>
          </Box>

          {/* 📄 Términos */}
          <Box sx={{ flex: 1, pl: 5 }}>
            <Typography variant="h5" gutterBottom>
              Términos y Condiciones
            </Typography>
            <Typography variant="body1">Política de privacidad</Typography>
            <Typography variant="body1">Devoluciones y cambios</Typography>
            <Typography variant="body1">Preguntas frecuentes</Typography>
          </Box>

          {/* 📞 Contacto */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              Más información
            </Typography>
            <Typography variant="body1">
              Atendemos de lunes a sábado. ¿Tienes dudas? <br />
              ¡Escríbenos por WhatsApp o en nuestras redes sociales!
            </Typography>
            <Image
              src="/webpayicon.webp"
              alt="icono webpay"
              width={180}
              height={60}
              priority
            />
          </Box>
        </Stack>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.5)' }} />
        <Typography variant="body2" textAlign="center">
          © {new Date().getFullYear()} Chipe/Libros. Todos los derechos
          reservados.
        </Typography>
      </Box>
    </>
  );
}
