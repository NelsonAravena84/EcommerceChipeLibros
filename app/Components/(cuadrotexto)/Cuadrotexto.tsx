
import { Box, Typography } from "@mui/material"

interface propsCuadro {
    titulo : string,
    descripcion: string,
    icono: any
}

export default function CuadroTexto({titulo,descripcion,icono}:propsCuadro){
    return (
        <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              mt:8
            }}
          >
            <Box sx={{color:'black'}}>
                {icono}
            </Box>

            <Typography variant="h5" sx={{ color: "black", mb: 2 }}>
              {titulo}
            </Typography>

            <Typography variant="h6" sx={{ color: "black", maxWidth: "800px" }}>
                {descripcion}
            </Typography>
          </Box>
    )
}