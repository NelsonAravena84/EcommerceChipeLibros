'use client';

import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import Layout from './Layout/Layout';
import Carousel from './(CSR(Components))/(carousel)/Carousel';
import informacionGeneral from './lib/informacionGeneral.json';
import CardImageDesc from './Components/Categorias/CuadroImagenDesc';
import ProductCard from './(CSR(Components))/(productcard)/Productcard';
import CuadroTexto from './Components/(cuadrotexto)/Cuadrotexto';
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
    <Layout>
      {/* Carousel */}
      <Box sx={{ mb: 1, mt: 0 }}>
        <Carousel
          images={[
            informacionGeneral.carousel.fotoPortada,
            informacionGeneral.carousel.foto1,
            informacionGeneral.carousel.foto2,
          ]}
          texts={CarouselText}
        />
      </Box>

      {/* Bienvenida */}
      <Box sx={{ mt: 10, px: 2, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{ color: 'black', fontWeight: 700, mb: 1 }}
        >
          ¡Bienvenido a ChipeLibro!
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: 'black', fontSize: '1rem', maxWidth: 700, mx: 'auto' }}
        >
          Descubre miles de libros de distintas categorías, desde novelas y literatura chilena hasta arte, diseño y crecimiento personal. Explora nuestra colección y encuentra tu próxima historia favorita.
        </Typography>

      {/* Card de categorías */}
      <Grid container spacing={5} justifyContent="center" sx = {{mt:5}}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={6} sm={3} key={i}>
            <CardImageDesc
              imageURL={informacionGeneral.categorias[`Imagen${i}`]}
              Tittle={informacionGeneral.categorias[`Descripcion${i}`]}
            />
          </Grid>
        ))}
      </Grid>
    </Box>

      {/* Oferta */ }
  <Box sx={{ border: 35, borderColor: '#322F2F', mt: 10 }}>
    <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: '#322F2F', py: 0.5 }}>
      <Typography sx={{ color: 'white', fontSize: '1rem' }}>OFERTAS</Typography>
    </Grid>
  </Box>

  {/* Productos destacados */ }
  <Box sx={{ mt: 6, px: 15, display: 'flex', justifyContent: 'center' }}>
    <ProductCard categoriaId={1} />
  </Box>

  {/* Sección "¿Por qué Chipe Libro?" */ }
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      p: 1,
      mt: 2,
      gap: 1,
      border: 35, 
      borderColor: '#322F2F',
      backgroundColor:'#322F2F'
    }}
  >
    <Typography variant="h4" sx={{ color: 'white', mb: 0.5 }}>
      ¿Por qué Chipe Libro?
    </Typography>
    <Typography variant="h6" sx={{ color: 'white', maxWidth: '800px', mb: 0 }}>
      Somos una librería online chilena, creada por amantes de la lectura. Cada compra la cuidamos en cada detalle, porque creemos que un libro es más que un producto: es un viaje y una experiencia.
    </Typography>
  </Box>

  {/* Cuadros de servicio */ }
  <Box sx={{ display: 'grid', gap: 1, px: 0, my: 2 }}>
    <Grid container spacing={1} justifyContent="center" direction={{ xs: 'column', md: 'row' }}>
      <Grid item xs={12} sm={6}>
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
      <Grid item xs={12} sm={6}>
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

  {/* Reseñas destacadas */ }
  <Box sx={{ mt: 15, mb:10, px: 0 }}>
    <Typography variant="h4" sx={{ color: 'black', mb: 1, textAlign: 'center' }}>
      Reseñas Destacadas
    </Typography>
    <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
      {[{
        titulo: "Compra fácil y atención impecable",
        descripcion: "Me encantó la experiencia de compra, rápida y segura. El libro llegó en perfecto estado y el soporte respondió todas mis dudas.",
        fecha: "12-05-2023",
        nombruser: "Ana",
        valoracion: 4.2
      }, {
        titulo: "Entregas rápidas y producto impecable",
        descripcion: "La calidad del libro superó mis expectativas y la entrega fue súper rápida, justo a tiempo para mi viaje. Una experiencia sin complicaciones.",
        fecha: "23-11-2022",
        nombruser: "Carlos",
        valoracion: 3.9
      }, {
        titulo: "Calidad impecable para un libro de segunda mano",
        descripcion: "Me sorprendió gratamente la condición del libro. Aunque es de segunda mano, llegó prácticamente como nuevo, sin daños visibles y con el olor característico que esperaba.",
        fecha: "11-05-2024",
        nombruser: "Luis",
        valoracion: 4.9
      }].map((res, idx) => (
        <Grid item xs={12} sm={4} md={3} key={idx}>
          <CuadroReseñas
            titulo={res.titulo}
            descripcion={res.descripcion}
            fecha={res.fecha}
            nombruser={res.nombruser}
            valoracion={res.valoracion}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
    </Layout >
  );
}
