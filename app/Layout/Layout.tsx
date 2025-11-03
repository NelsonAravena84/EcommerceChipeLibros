'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import UserIcon from '../(CSR(Components))/UserIcon';
import CartIcon from '../(CSR(Components))/CartIcon';
import HeartIcon from '../(CSR(Components))/HeartIcon';
import Link from 'next/link';
import { Facebook, Instagram, Search, Whatsapp } from 'iconoir-react';
import MenuCategorias from '../(CSR(Components))/(categoriaNav)/Categorianav';
import { useRouter } from 'next/navigation';
import DrawerCarrito from '../Components/(drawerCarrito)/DrawerCarrito';
import { useCart } from '@/app/context/CartContext';

interface MyComponentProps {
  children: any;
}

export default function Layout({ children }: MyComponentProps) {
  const [drawerCarritoisOpen, setdrawerCarritoisOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [categoriasOpen, setCategoriasOpen] = useState(false);

  const router = useRouter();
  const { cart } = useCart();

  const isMobile = useMediaQuery('(max-width:767px)');

  // --- Categorías desplegable en escritorio ---
  const handleCategoriasClick = () => {
    setCategoriasOpen((prev) => !prev);
  };

  const handleCategoriasClose = () => {
    setCategoriasOpen(false);
  };

  // --- Acciones mobile ---
  const handleClicknavAcceso = () => {
    router.push('/login');
  };

  const handleClickDrawerOpen = () => {
    setdrawerCarritoisOpen(true);
  };

  const toggleMenuDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setMenuDrawerOpen(open);
  };

  const menuItems = [
    { label: 'INICIO', href: '/' },
    { label: 'CATEGORÍAS' },
    { label: 'DESTACADOS', href: '/destacados' },
    { label: 'BUSCAR PEDIDO', href: '/buscar-pedido' },
  ];

  return (
    <>
      {/* NAVBAR fixed */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1100,
          backgroundColor: isMobile ? '#322F2F' : 'white',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        {/* Navbar Desktop */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 15,
              py: 2,
              backgroundColor: 'white',
            }}
          >
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
            <Box sx={{ pr: 12 }}>
              <Image
                src="/IconLogo.webp"
                alt="logo de la pagina"
                width={290}
                height={70}
                priority
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
                <UserIcon color="black" width={40} height={40} />
              </Box>
              <Box onClick={handleClickDrawerOpen} sx={{ cursor: 'pointer' }}>
                <Badge badgeContent={cart.length} color="error" invisible={cart.length === 0}>
                  <CartIcon color="black" width={40} height={40} />
                </Badge>
                <DrawerCarrito isOpen={drawerCarritoisOpen} onClose={() => setdrawerCarritoisOpen(false)} />
              </Box>
              <HeartIcon />
            </Box>
          </Box>
        )}

        {/* Navbar MOBILE */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              backgroundColor: '#322F2F',
              color: 'white',
            }}
          >
            {/* Logo izquierdo */}
            <Box sx={{ flexShrink: 0 }}>
              <Image
                src="/LogoPagina.webp"
                alt="logo de la pagina"
                width={160}
                height={42}
                priority
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Tooltip title="Buscar">
                <IconButton aria-label="search" sx={{ color: 'white' }}>
                  <Search width={24} height={24} color="white" />
                </IconButton>
              </Tooltip>
              <Box onClick={handleClicknavAcceso} sx={{ cursor: 'pointer', color: 'white' }} aria-label="Acceso">
                <UserIcon color="white" width={35} height={35} />
              </Box>
              <Box onClick={handleClickDrawerOpen} sx={{ position: 'relative', cursor: 'pointer', color: 'white' }} aria-label="Carrito">
                <Badge badgeContent={cart.length} color="error" invisible={cart.length === 0} overlap="circular">
                  <CartIcon color="white" width={35} height={35} />
                </Badge>
                <DrawerCarrito isOpen={drawerCarritoisOpen} onClose={() => setdrawerCarritoisOpen(false)} />
              </Box>
              <IconButton aria-label="menu" onClick={toggleMenuDrawer(true)} sx={{ color: 'white' }} size="large">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={menuDrawerOpen} onClose={toggleMenuDrawer(false)}>
                <Box
                  sx={{ width: 250, bgcolor: "#322F2F", color: "white" }}
                  role="presentation"
                  onClick={toggleMenuDrawer(false)}
                  onKeyDown={toggleMenuDrawer(false)}
                >
                  <List>
                    {menuItems.map((item, index) => (
                      <ListItem
                        button
                        key={index}
                        component={item.href ? Link : 'div'}
                        href={item.href ?? undefined}
                        sx={{
                          color: "white",
                          fontWeight: 'bold',
                          borderBottom: '1px solid #444'
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Box>
        )}

        {/* Menú inferior solo en escritorio */}
        {!isMobile && (
          <Box sx={{ backgroundColor: '#322F2F', py: 1, position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 5,
                p: 4,
                color: '#fff',
                fontWeight: 500,
                flexWrap: 'wrap',
                position: 'relative'
              }}
            >
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                INICIO
              </Link>
              {/* Botón de Categorías con menú centralizado */}
              <Box
                sx={{ cursor: 'pointer', color: 'white', position: 'relative', fontWeight: 600 }}
                onClick={handleCategoriasClick}
              >
                CATEGORÍAS
                {/* Menú desplegable centralizado y ancho completo */}
                {categoriasOpen && (
                  <Box
                    sx={{
                      position: 'fixed',
                      top: '120px', // ajusta a la altura real de tu navbar
                      left: 0,
                      width: '100vw',
                      zIndex: 1400,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(50,47,47,0.98)',
                      boxShadow: 3,
                      py: 4,
                    }}
                    onMouseLeave={handleCategoriasClose}
                  >
                    <Box sx={{ width: '90vw', maxWidth: 1600 }}>
                      <MenuCategorias isOpen={true} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Link href="/destacados" style={{ color: 'white', textDecoration: 'none' }}>
                DESTACADOS
              </Link>
              <Link href="/buscar-pedido" style={{ color: 'white', textDecoration: 'none' }}>
                BUSCAR PEDIDO
              </Link>
            </Box>
          </Box>
        )}
      </Box>

      {/* Margen superior para que el contenido no quede tapado */}
      <Box sx={{ pt: { xs: '70px', md: '120px' } }}>
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#322F2F',
          color: 'white',
          mt: 6,
          py: 2,
          px: { xs: 1, sm: 3, md: 6 },
          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' }, // Font más pequeña
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4, xl: 16 }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 } }}>
            <Image
              src="/LogoPagina.webp"
              alt="logo de la pagina"
              width={280}
              height={65} // Tamaño un poco menor
              priority
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              En Chipe Libros te acercamos a nuevas historias: literatura, filosofía, historia y mucho más. Envíos a todo Chile, compra segura, rápida y sin complicaciones.
            </Typography>
            <Box sx={{ display: 'flex', mt: 3, gap: 2 }}>
              <Avatar alt="Facebook" sx={{ width: 40, height: 40 }}>
                <Facebook color="black" height={22} width={22} />
              </Avatar>
              <Avatar alt="Instagram" sx={{ width: 40, height: 40 }}>
                <Instagram color="black" height={22} width={22} />
              </Avatar>
              <Avatar alt="Whatsapp" sx={{ width: 40, height: 40 }}>
                <Whatsapp color="black" height={22} width={22} />
              </Avatar>
            </Box>
          </Box>

          <Box sx={{ flex: 1, pl: { sm: 4 }, mb: { xs: 2, sm: 0 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Términos y Condiciones
            </Typography>
            <Typography variant="body2">Política de privacidad</Typography>
            <Typography variant="body2">Devoluciones y cambios</Typography>
            <Typography variant="body2">Preguntas frecuentes</Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Más información
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Atendemos de lunes a sábado. ¿Tienes dudas? <br />
              ¡Escríbenos por WhatsApp o en nuestras redes sociales!
            </Typography>
            <Box sx={{ maxWidth: 140 }}>
              <Image
                src="/webpayicon.webp"
                alt="icono webpay"
                width={120}
                height={50}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.5)' }} />

        <Typography variant="caption" textAlign="end" sx={{ pb: 1 }}>
          © {new Date().getFullYear()} Chipe/Libros. Todos los derechos reservados.
        </Typography>
      </Box>

    </>
  );
}
