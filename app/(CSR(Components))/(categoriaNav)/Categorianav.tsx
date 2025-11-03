import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";

interface PropsCategoriaNav {
  isOpen: boolean;
}

export default function MenuCategorias({ isOpen }: PropsCategoriaNav) {
  const categorias = [
    {
      titulo: "BELLAS ARTES",
      items: ["Arquitectura", "Arte", "Cine y Música", "Diseño", "Fotografía", "Ilustración", "Moda"],
    },
    {
      titulo: "BIENESTAR",
      items: ["Crecimiento personal", "Esoterismo y Mitología", "Tarot y oráculos", "Vida Saludable y Fitness"],
    },
    {
      titulo: "ESTILO DE VIDA",
      items: ["Manualidades", "Jardinería", "Cocina", "Viajes y Estilos de Vida", "Juegos y Puzzles", "Automóviles y Deportes"],
    },
    {
      titulo: "NO FICCIÓN",
      items: ["Actualidad", "Biografías", "Ciencias y Naturaleza", "Historia", "Liderazgo y Empresa", "Ciencias de la Salud"],
    },
    {
      titulo: "FICCIÓN",
      items: [
        "Cuentos",
        "Literatura Chilena",
        "Literatura Clásica",
        "Literatura Contemporánea",
        "Literatura Latinoamericana",
        "Novelas Ciencia Ficción",
        "Novela Gráfica",
      ],
    },
    {
      titulo: "CIENCIAS SOCIALES",
      items: ["Sociología", "Antropología", "Psicología", "Economía", "Ciencias Políticas", "Derecho"],
    },
  ];

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#322F2F",
        width:"100%",
        color: "white",
        gap: 4,
        p: 6,
        justifyContent: "center",
      }}
    >
      <Grid container spacing={4} sx={{ flex: 1, justifyContent: "center" }}>
        {/* Sección lateral izquierda */}
        <Grid item xs={12} sm={3} md={2}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Link href="/productos/novedades" passHref>
              <Typography
                variant="subtitle1"
                sx={{ cursor: "pointer", borderRight: "1px solid white", pr: 2 }}
              >
                NOVEDADES
              </Typography>
            </Link>
            <Link href="/productos/mas-vendidos" passHref>
              <Typography
                variant="subtitle1"
                sx={{ cursor: "pointer", borderRight: "1px solid white", pr: 2 }}
              >
                MÁS VENDIDOS
              </Typography>
            </Link>
            <Link href="/productos/ofertas" passHref>
              <Typography
                variant="subtitle1"
                sx={{ cursor: "pointer", borderRight: "1px solid white", pr: 2 }}
              >
                OFERTAS
              </Typography>
            </Link>
          </Box>
        </Grid>

        {/* Secciones de categorías */}
        {categorias.map((cat, index) => (
          <Grid item xs={12} sm={4} md={2} key={index}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                borderBottom: "1px solid white",
                mb: 1,
                pb: 0.5,
                textTransform: "uppercase",
              }}
            >
              {cat.titulo}
            </Typography>
            {cat.items.map((item, i) => (
              <Link key={i} href={`/productos/categoria/${encodeURIComponent(item)}`} passHref>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": { color: "#fff", cursor: "pointer" },
                  }}
                >
                  {item}
                </Typography>
              </Link>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
