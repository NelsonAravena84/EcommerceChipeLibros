import { colors, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Layout from './Layout/Layout';
import Carousel from './(CSR(Components))/(carousel)/Carousel';
import informacionGeneral from './lib/informacionGeneral.json'
import CardImageDesc from './Components/Categorias/CuadroImagenDesc';

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
          <Box sx={{ display: "flex", justifyContent: "center", gap:8 }}>
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen1} Tittle={informacionGeneral.categorias.Descripcion1}/>
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen2} Tittle={informacionGeneral.categorias.Descripcion2}/>
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen3} Tittle={informacionGeneral.categorias.Descripcion3}/>
            <CardImageDesc imageURL={informacionGeneral.categorias.Imagen4} Tittle={informacionGeneral.categorias.Descripcion4}/>

          </Box>
        </Box>

      </Layout>
    </>
  );
}
