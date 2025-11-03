import { Box, TextField, Typography, Button } from "@mui/material";
import Layout from "../Layout/Layout";

export default function SearchOrder() {
  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          color: "black",
          justifyContent: "center",
          mt: {xl:20, xs : 15},
          gap: 2,
          maxWidth: 600,
          mx: "auto",
          px: 2,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          BUSCAR PEDIDO
        </Typography>

        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Introduzca el código de seguimiento de su pedido para comprobar el estado de su envío
        </Typography>

        <Box sx={{ mt: 4, display: "grid", gap: 2 }}>
          <Typography sx={{ color: "black" }}>Número de Pedido</Typography>
          <TextField fullWidth id="FormularioCorreo" size="small" />
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              width: { xs: "100%", sm: "auto" },
              px: 4,
              py: 1.5,
            }}
          >
            Buscar
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              width: { xs: "100%", sm: "auto" },
              px: 4,
              py: 1.5,
              border: "1px solid #ccc",
            }}
          >
            Limpiar
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
