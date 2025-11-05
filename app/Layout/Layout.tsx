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
  ListItemButton,
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
  const [categoriesDrawerOpen, setCategoriesDrawerOpen] = useState(false);

  const router = useRouter();
  const { cart } = useCart();

  const isMobile = useMediaQuery('(max-width:767px)');

  const handleCategoriasClick = () => {
    setCategoriasOpen((prev) => !prev);
  };

  const handleCategoriasClose = () => {
    setCategoriasOpen(false);
  };

  const handleClicknavAcceso = () => {
    router.push('/login');
  };

  const handleClickDrawerOpen = () => {
    setdrawerCarritoisOpen(true);
  };

  // toggle para el drawer de menú (hamburguesa). Protege Tab/Shift
  const toggleMenuDrawer = (open: boolean) => (
    event?: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setMenuDrawerOpen(open);
    setCategoriesDrawerOpen(false);
  };

  // Menú principal del drawer (mobile)
  const menuItems = [
    { label: 'INICIO', href: '/' },
    { label: 'CATEGORÍAS' }, // manejará submenu
    { label: 'DESTACADOS', href: '/destacados' },
    { label: 'BUSCAR PEDIDO', href: '/buscar-pedido' },
  ];

  const categories = [
    { label: 'Literatura', href: '/categoria/literatura' },
    { label: 'Historia', href: '/categoria/historia' },
    { label: 'Infantil', href: '/categoria/infantil' },
    { label: 'Misterio', href: '/categoria/misterio' },
    { label: 'Filosofía', href: '/categoria/filosofia' },
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

              {/* Ícono del carrito - Desktop (DrawerCarrito está afuera) */}
              <Box sx={{ cursor: 'pointer' }} onClick={handleClickDrawerOpen}>
                <Badge badgeContent={cart.length} color="error" invisible={cart.length === 0}>
                  <CartIcon color="black" width={40} height={40} />
                </Badge>
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

              {/* Ícono del carrito - Mobile (DrawerCarrito está afuera) */}
              <Box onClick={handleClickDrawerOpen} sx={{ position: 'relative', cursor: 'pointer', color: 'white' }} aria-label="Carrito">
                <Badge badgeContent={cart.length} color="error" invisible={cart.length === 0} overlap="circular">
                  <CartIcon color="white" width={35} height={35} />
                </Badge>
              </Box>

              <IconButton aria-label="menu" onClick={toggleMenuDrawer(true)} sx={{ color: 'white' }} size="large">
                <MenuIcon />
              </IconButton>

              {/* Drawer para mobile (menú principal) */}
              <Drawer
                anchor="right"
                open={menuDrawerOpen}
                onClose={(event, reason) => {
                  if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    setMenuDrawerOpen(false);
                    setCategoriesDrawerOpen(false);
                  }
                }}
                PaperProps={{
                  sx: {
                    width: '100vw',
                    maxWidth: '60vw',
                    bgcolor: '#322F2F',
                    color: 'white',
                  },
                }}
              >
                <Box
                  sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
                  role="presentation"
                  onKeyDown={toggleMenuDrawer(false)}
                >
                  <List>
                    {menuItems.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.label === 'CATEGORÍAS' ? (
                          <>
                            <ListItemButton
                              onClick={() => setCategoriesDrawerOpen(o => !o)}
                              sx={{
                                color: "white",
                                fontWeight: 'bold',
                                borderBottom: '1px solid #444'
                              }}
                            >
                              <ListItemText primary="CATEGORÍAS" />
                            </ListItemButton>
                            {categoriesDrawerOpen && (
                              <Box sx={{ bgcolor: "#232324" }}>
                                {categories.map((cat, i) => (
                                  <Link key={i} href={cat.href ?? "#"} passHref legacyBehavior>
                                    <ListItemButton
                                      component="a"
                                      sx={{
                                        pl: 4,
                                        color: "#f5f5f5",
                                        fontSize: "1rem",
                                        borderBottom: '1px solid #333',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      <ListItemText primary={cat.label} />
                                    </ListItemButton>
                                  </Link>
                                ))}
                              </Box>
                            )}
                          </>
                        ) : item.href ? (
                          <Link href={item.href} passHref legacyBehavior>
                            <ListItemButton
                              component="a"
                              sx={{
                                color: "white",
                                fontWeight: 'bold',
                                borderBottom: '1px solid #444',
                                cursor: 'pointer',
                              }}
                            >
                              <ListItemText primary={item.label} />
                            </ListItemButton>
                          </Link>
                        ) : (
                          <ListItemButton
                            sx={{
                              color: "white",
                              fontWeight: 'bold',
                              borderBottom: '1px solid #444',
                            }}
                            onClick={() => { }}
                          >
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        )}
                      </React.Fragment>
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
                fontWeight: 600,
                flexWrap: 'wrap',
                position: 'relative'
              }}
            >
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                INICIO
              </Link>
              <Box
                sx={{ cursor: 'pointer', color: 'white', position: 'relative', fontWeight: 600 }}
                onClick={handleCategoriasClick}
              >
                CATEGORÍAS
                {categoriasOpen && (
                  <Box
                    sx={{
                      position: 'fixed',
                      top: '202px',
                      left: 0,
                      width: '100vw',
                      zIndex: 1400,
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(50,47,47,0.98)',
                      boxShadow: 3,
                      py: 4,
                    }}
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

      {/* Footer (compacto) */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#322F2F',
          color: 'white',
          mt: 6,
          py: 2,
          px: { xs: 1, sm: 3, md: 6 },
          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.5, sm: 3, xl: 12 }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 180 }, mb: { xs: 1.5, sm: 0 } }}>
            <Image
              src="/LogoPagina.webp"
              alt="logo de la pagina"
              width={280}
              height={80}
              priority
            />
            <Typography variant="body2" sx={{ mt: 1, fontSize: '0.85rem' }}>
              En Chipe Libros te acercamos a nuevas historias: literatura, filosofía, historia y mucho más. Envíos a todo Chile, compra segura, rápida y sin complicaciones.
            </Typography>
            <Box sx={{ display: 'flex', mt: 2, gap: 1.5 }}>
              <Avatar alt="Facebook" sx={{ width: 34, height: 34 }}>
                <Facebook color="black" height={18} width={18} />
              </Avatar>
              <Avatar alt="Instagram" sx={{ width: 34, height: 34 }}>
                <Instagram color="black" height={18} width={18} />
              </Avatar>
              <Avatar alt="Whatsapp" sx={{ width: 34, height: 34 }}>
                <Whatsapp color="black" height={18} width={18} />
              </Avatar>
            </Box>
          </Box>

          <Box sx={{ flex: 1, pl: { sm: 3 }, mb: { xs: 1.5, sm: 0 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Términos y Condiciones
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Política de privacidad</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Devoluciones y cambios</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Preguntas frecuentes</Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
              Más información
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem' }}>
              Atendemos de lunes a sábado. ¿Tienes dudas? <br />
              ¡Escríbenos por WhatsApp o en nuestras redes sociales!
            </Typography>
            <Box sx={{ maxWidth: 120 }}>
              <Image
                src="/webpayicon.webp"
                alt="icono webpay"
                width={120}
                height={45}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.5)' }} />

        <Typography variant="caption" textAlign="center" sx={{ pb: 1, fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Chipe/Libros. Todos los derechos reservados.
        </Typography>
      </Box>

      {/* DrawerCarrito colocado al final (fuera de cualquier Box clicable) */}
      <DrawerCarrito
        isOpen={drawerCarritoisOpen}
        onClose={(event) => {
          // Opcional: puedes inspeccionar event si quieres
          setdrawerCarritoisOpen(false);
        }}
      />

    </>
  );
}
