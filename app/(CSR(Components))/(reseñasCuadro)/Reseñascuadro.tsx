'use client'

import { Box, Typography, Rating, Card, CardContent, CardMedia } from "@mui/material"

interface propsReseña {
  titulo: string
  descripcion: string
  fecha: string
  nombruser: string
  valoracion: number
}

export default function CuadroReseñas({
  titulo,
  descripcion,
  fecha,
  nombruser,
  valoracion,
}: propsReseña) {
  return (
    <Card
      sx={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 1,
        p: 2,
        maxWidth: 500,
      }}
    >
   

      {/* Contenido */}
      <CardContent sx={{ flex: 1, p: 0 }}>
        {/* Título y valoración */}
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          {titulo}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2">{valoracion.toFixed(1)}</Typography>
          <Rating value={valoracion} precision={0.5} readOnly size="small" />
        </Box>

        {/* Descripción */}
        <Typography
          variant="body2"
          sx={{ mt: 1, mb: 2, color: "text.secondary", maxWidth: "400px" }}
        >
          {descripcion}
        </Typography>

        {/* Usuario y fecha */}
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {nombruser}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fecha}
        </Typography>
      </CardContent>
    </Card>
  )
}
