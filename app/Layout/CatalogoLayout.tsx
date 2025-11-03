'use client'

import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
  Select,
  MenuItem,
  Chip,
  useMediaQuery,
  Paper,
  Badge,
} from "@mui/material";
import ProductCard from "../(CSR(Components))/(productcard)/Productcard";

interface propsCatalogo {
  titulo: string,
  productcardId: any
}

export default function CatalogoLayout({ titulo, productcardId }: propsCatalogo) {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Box
      sx={{
        background: "white",
        minHeight: "100vh",
        p: { xs: 1, md: 4 },
        width: "100%",
        mt:14
      }}
    >
      {/* Barra superior de catálogo */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mt: 2,
          mb: 4,
          width: "100%",
          maxWidth: 1800,
          mx: "auto",
          display: "flex",
          flexDirection:  { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 4,
          background: "white",
          gap:3
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4" sx={{ color: "black", fontWeight: 700, letterSpacing: "0.5px" }}>
            {titulo}
          </Typography>
          {/* Aquí puedes inyectar un Chip/Badge con la cantidad de productos */}
          <Chip label="Novedades" variant="filled" sx={{ bgcolor: "#1BB48D", color: "white", fontWeight: 700 }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ color: "black" }}>Ordenar por:</Typography>
          <Select defaultValue="precios-bajos" size="small" sx={{ bgcolor: "white", borderRadius: 2 }}>
            <MenuItem value="precios-bajos">Precios bajos</MenuItem>
            <MenuItem value="precios-altos">Precios altos</MenuItem>
            <MenuItem value="nuevos">Más recientes</MenuItem>
          </Select>
        </Box>
      </Paper>

      {/* Main flex layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
          gap: { xs: 3, md: 6 },
          width: "100%",
          maxWidth: 1800,
          mx: "auto",
        }}
      >
        {/* Filtros sticky en escritorio */}
        <Box
          sx={{
            position: { xs: "static", md: "sticky" },
            top: { md: 40 },
            zIndex: 10,
            minWidth: { xs: "100%", md: 310 },
            maxWidth: { xs: "100%", md: 350 },
            width: { xs: "100%", md: 350 },
            mb: { xs: 2, md: 0 },
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "black", fontWeight: 700 }}>
              Precio
            </Typography>
            <Slider
              defaultValue={[10000, 500000]}
              valueLabelDisplay="auto"
              min={10000}
              max={500000}
            />
            <Typography variant="body2" sx={{ mt: 1, color: 'black' }}>
              $10.000 - $500.000
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "black", fontWeight: 700 }}>
              Idioma
            </Typography>
            <FormGroup>
              <FormControlLabel sx={{ color: 'black' }} control={<Checkbox />} label="Español" />
              <FormControlLabel sx={{ color: 'black' }} control={<Checkbox />} label="Inglés" />
            </FormGroup>
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "black", fontWeight: 700 }}>
              Editorial
            </Typography>
            <Box sx={{ color: 'black' }}>
              <Typography variant="body2">Penguin classics (23)</Typography>
              <Typography variant="body2">Debolsillo (10)</Typography>
              <Typography variant="body2">Edisur (5)</Typography>
              <Typography variant="body2">Editorial Planeta (14)</Typography>
            </Box>
          </Paper>
        </Box>

        {/* ==== GRID PRODUCTOS ==== */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: { xs: "100%", md: 1400, xl: 1600 },
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 3, sm: 4, md: 5, lg: 7 },
            alignItems: "stretch",
            ml: {xl:20}
          }}
        >
          <ProductCard categoriaId={productcardId} />
        </Box>
      </Box>
    </Box>
  );
}
