'use client';

import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import Layout from './Layout/Layout';
import Carousel from './(CSR(Components))/(carousel)/Carousel';
import informacionGeneral from './lib/informacionGeneral.json';
import CardImageDesc from './Components/Categorias/CuadroImagenDesc';
import ProductCard from './(CSR(Components))/(productcard)/Productcard';
import CuadroTexto from './Components/(cuadrotexto)/Cuadrotexto';
import { DeliveryTruck } from 'iconoir-react';
import Image from 'next/image';
import CuadroReseñas from './(CSR(Components))/(reseñasCuadro)/Reseñascuadro';

export default function Home() {
  const CarouselText: string[] = [
    '¡Tú proxima historia a un clic!',
    '¡ENVÍOS A TODO CHILE!',
    'ENVÍO VÍA BLUEXPRESS',
  ];

  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      <Layout>
        {/* Carousel */}
        <Box sx={{ mb: 4, mt: isMobile ? 0 : 4 }}>
          <Carousel
            images={[
              informacionGeneral.carousel.fotoPortada,
              informacionGeneral.carousel.foto1,
              informacionGeneral.carousel.foto2,
            ]}
            texts={CarouselText}
          />
        </Box>

        {/* Categorías destacadas */}
        <Box sx={{ mt: 4, px: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={{ xs: 2, md: 0 }}>
            <Grid
              component="div"
              size={{
                xs: 12,
                md: "auto"
              }}>
              <Typography variant="h5" sx={{ color: 'black' }}>
                Categorías destacadas
              </Typography>
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                md: "auto"
              }}>
              <Box
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: '#322F2F',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Ver todas las categorías
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Card de categorías */}
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center" alignItems="center">
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}>
              <CardImageDesc
                imageURL={informacionGeneral.categorias.Imagen1}
                Tittle={informacionGeneral.categorias.Descripcion1}
              />
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}>
              <CardImageDesc
                imageURL={informacionGeneral.categorias.Imagen2}
                Tittle={informacionGeneral.categorias.Descripcion2}
              />
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}>
              <CardImageDesc
                imageURL={informacionGeneral.categorias.Imagen3}
                Tittle={informacionGeneral.categorias.Descripcion3}
              />
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 6,
                md: 3
              }}>
              <CardImageDesc
                imageURL={informacionGeneral.categorias.Imagen4}
                Tittle={informacionGeneral.categorias.Descripcion4}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Oferta */}
        <Box sx={{ border: 4, borderColor: '#322F2F', mt: 5 }}>
          <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: '#322F2F', py: 1 }} spacing={2}>
            <Grid component="div">
              <Typography>OFERTAS</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Productos destacados */}
        <Box sx={{ mt: 4, justifyContent: 'center' }}>
          <Grid
            component="div"
            size={{
              xs: 12,
              sm: 8,
              md: 6,
              lg: 4,
              xl: 3
            }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProductCard categoriaId={37} />
          </Grid>
        </Box>

        {/* Sección "¿Por qué Chipe Libro?" */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column' },
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 3,
            mt: 8,
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ color: 'black' }}>
            ¿Por qué Chipe Libro?
          </Typography>
          <Typography variant="h6" sx={{ color: 'black', maxWidth: '1000px' }}>
            Somos una librería online chilena, creada por amantes de la lectura.
            Cada compra la cuidamos en cada detalle, porque creemos que un libro es más
            que un producto: es un viaje y una experiencia.
          </Typography>
        </Box>

        {/* Cuadros de servicio */}
        <Box sx={{ display: 'grid', gap: 2, px: 2, my: 4 }}>
          <Grid container spacing={2} justifyContent="center" direction={{ xs: 'column', md: 'row' }}>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 6
              }}>
              <CuadroTexto
                titulo={'Libros nuevos y usados'}
                descripcion="En ChipeLibro encontrarás tanto libros nuevos como de segunda mano. Los ejemplares que no se venden son donados para seguir fomentando la lectura en distintas comunidades."
                icono={
                  <Image
                    src="/Recycling_symbol.svg"
                    alt="logo de la pagina"
                    width={65}
                    height={65}
                    priority
                  />
                }
              />
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 6
              }}>
              <CuadroTexto
                titulo={'Envíos a todo Chile'}
                descripcion="Entregamos en Santiago y enviamos a todo Chile a través de Starken. También realizamos envíos internacionales mediante Correos de Chile."
                icono={
                  <Image
                    src="/delivery-truck.png"
                    alt="logo de la pagina"
                    width={65}
                    height={65}
                    priority
                  />
                }
              />
            </Grid>
          </Grid>
        </Box>

        {/* Reseñas destacadas */}
        <Box sx={{ mt: 8, px: 2 }}>
          <Typography variant="h4" sx={{ color: 'black', mb: 2, textAlign: 'center' }}>
            Reseñas Destacadas
          </Typography>
          <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 4,
                md: 3
              }}>
              <CuadroReseñas
                titulo="Compra fácil y atención impecable "
                descripcion="Me encantó la experiencia de compra, rápida y segura. El libro llegó en perfecto estado y el soporte respondió todas mis dudas."
                fecha="12-05-2023"
                nombruser="Ana"
                valoracion={4.2}
              />
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 4,
                md: 3
              }}>
              <CuadroReseñas
                titulo="Entregas rápidas y producto impecable"
                descripcion="La calidad del libro superó mis expectativas y la entrega fue súper rápida, justo a tiempo para mi viaje. Una experiencia sin complicaciones."
                fecha="23-11-2022"
                nombruser="Carlos"
                valoracion={3.9}
              />
            </Grid>
            <Grid
              component="div"
              size={{
                xs: 12,
                sm: 4,
                md: 3
              }}>
              <CuadroReseñas
                titulo="Calidad impecable para un libro de segunda mano"
                descripcion="Me sorprendió gratamente la condición del libro. Aunque es de segunda mano, llegó prácticamente como nuevo, sin daños visibles y con el olor característico que esperaba."
                fecha="11-05-2024"
                nombruser="Luis"
                valoracion={4.9}
              />
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
}
