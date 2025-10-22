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
} from "@mui/material";
import Layout from "../Layout/Layout";
import ProductCard from "../(CSR(Components))/(productcard)/Productcard";

export default function Destacados() {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          mt: 10,
          transform:"scale(0.94)"
        }}
      >
        <Box
          sx={{
            mt:5,
            display: "grid",
            gap: 3,
            height: "fit-content",
          }}
        >
          <Box sx={{ width: 360, p: 3, border: 1, borderColor: "black" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Precio
            </Typography>
            <Slider
              defaultValue={[10000, 500000]}
              valueLabelDisplay="auto"
              min={10000}
              max={500000}
            />
            <Typography variant="body2" sx={{ mt: 1, color:'black'}}>
              $10.000 - $500.000
            </Typography>
          </Box>

          <Box sx={{ width: 360, p: 2, border: 1, borderColor: "black" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Idioma
            </Typography>
            <FormGroup>
              <FormControlLabel sx={{color:'black'}} control={<Checkbox />} label="Español" />
              <FormControlLabel sx={{color:'black'}} control={<Checkbox />} label="Inglés" />
            </FormGroup>
          </Box>

          <Box sx={{ width: 360, p: 2, border: 1, borderColor: "black" }}>
            <Typography variant="h6" sx={{ color: "black" }}>
              Editorial
            </Typography>
            <Box sx={{color:'black'}}>
              <Typography variant="body2">Penguin classics (23)</Typography>
              <Typography variant="body2">Debolsillo (10)</Typography>
              <Typography variant="body2">Edisur (5)</Typography>
              <Typography variant="body2">Editorial Planeta (14)</Typography>
            </Box>
          </Box>
        </Box>

        {/* ==== PRODUCTOS ==== */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              borderBottom: "1px solid black",
              pb: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: "black", fontWeight: "bold" }}>
              DESTACADOS
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ color: "black" }}>Ordenar por :</Typography>
              <Select defaultValue="precios-bajos" size="small">
                <MenuItem value="precios-bajos">Precios bajos</MenuItem>
                <MenuItem value="precios-altos">Precios altos</MenuItem>
                <MenuItem value="nuevos">Más recientes</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* GRID DE PRODUCTOS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap:3,
              justifyItems: "start",
            }}
          >
            {/* Escala más pequeña pero mantiene proporciones */}
            <Box sx={{ transform: "scale(0.9)"}}>
              <ProductCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
