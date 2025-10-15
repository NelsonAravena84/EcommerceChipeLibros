import { colors, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Layout from './Layout/Layout';
import Carousel from './(CSR(Components))/(carousel)/Carousel';
import informacionGeneral from './lib/informacionGeneral.json'
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

  return (
    <>
      <Layout>
        <Box> {/* Carrousel */}
          <Carousel images={[
            informacionGeneral.carousel.fotoPortada,
            informacionGeneral.carousel.foto1,
            informacionGeneral.carousel.foto2,
          ]}
            texts={CarouselText} />
        </Box>

        <Box sx={{ mt: 15 }}>
          {/* Fila superior con los dos textos */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 87, // separa los elementos
              mb: 6,   // margen inferior para separar del CardImageDesc
            }}
          >
            {/* Título principal */}
            <Typography variant="h5" sx={{ color: "black" }}>
              Categorías destacadas
            </Typography>

            {/* Botón "Ver todas las categorías" */}
            <Box
              sx={{
                px: 4,
                py: 1,
                backgroundColor: "#322F2F",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                Ver todas las categorías
              </Typography>
            </Box>
          </Box>

          {/* Card debajo */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 8 }}>
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen1} Tittle={informacionGeneral.categorias.Descripcion1} />
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen2} Tittle={informacionGeneral.categorias.Descripcion2} />
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen3} Tittle={informacionGeneral.categorias.Descripcion3} />
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen4} Tittle={informacionGeneral.categorias.Descripcion4} />
          </Box>


          <Box sx={{ border: 40, borderColor: '#322F2F', mt: 8 }}>
            <Box sx={{ backgroundColor: '#322F2F', display: 'flex', gap: 4, justifyContent: 'center' }}>
              <Typography>
                OFERTAS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 8, mt: 9 }}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 8, mt: 9 }}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              mt: 8
            }}
          >
            <Typography variant="h4" sx={{ color: "black", mb: 2 }}>
              ¿Por qué Chipe Libro?
            </Typography>

            <Typography variant="h6" sx={{ color: "black", maxWidth: "1000px" }}>
              Somos una librería online chilena, creada por amantes de la lectura.
              Cada compra la cuidamos en cada detalle, porque creemos que un libro es más
              que un producto: es un viaje y una experiencia.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 20, mt: 2 }}>
            <CuadroTexto titulo={'Libros nuevos y usados'} descripcion='En ChipeLibro encontrarás tanto libros nuevos como de segunda mano. 
            Los ejemplares que no se venden son donados para seguir fomentando la lectura en distintas comunidades.' icono={<Image
                className="d"
                src="/iconrecycle.png"
                alt="logo de la pagina"
                width={65}
                height={65}
                priority
              />} />

            <CuadroTexto titulo={'Envíos a todo Chile'} descripcion='Entregamos en Santiago y enviamos a todo Chile a través de Starken. 
            También realizamos envíos internacionales mediante Correos de Chile.' icono={<Image
                className="d"
                src="/delivery-truck.png"
                alt="logo de la pagina"
                width={65}
                height={65}
                priority
              />} />
          </Box>


          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              mt: 8
            }}
          >
            <Typography variant="h4" sx={{ color: "black", mb: 2 }}>
              Reseñas Destacadas
            </Typography>

            <Box sx={{display: 'flex', gap:5, mt:7}}>
            <CuadroReseñas
              titulo="La venganza De Los Dinosaurios"
              descripcion="La venganza de los dinosaurios es pura adrenalina. Una historia llena de acción y suspenso que me atrapó desde la primera página."
              imagen="/imagenes/dinosaurios.jpg"
              fecha="23-05-2024"
              nombruser="Jorge"
              valoracion={4.9}
            />

             <CuadroReseñas
              titulo="La venganza De Los Dinosaurios"
              descripcion="La venganza de los dinosaurios es pura adrenalina. Una historia llena de acción y suspenso que me atrapó desde la primera página."
              imagen="/imagenes/dinosaurios.jpg"
              fecha="23-05-2024"
              nombruser="Jorge"
              valoracion={4.9}
            />

             <CuadroReseñas
              titulo="La venganza De Los Dinosaurios"
              descripcion="La venganza de los dinosaurios es pura adrenalina. Una historia llena de acción y suspenso que me atrapó desde la primera página."
              imagen="/imagenes/dinosaurios.jpg"
              fecha="23-05-2024"
              nombruser="Jorge"
              valoracion={4.9}
            />
            </Box>

          </Box>
        </Box>

      </Layout>
    </>
  );
}
