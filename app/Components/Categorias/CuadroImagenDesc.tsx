import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface CardImageDescProp {
  imageURL: string;
  Tittle: string;
}

export default function CardImageDesc({ imageURL, Tittle }: CardImageDescProp) {
  return (
    <Box
      sx={{
        position: "relative", 
        width: 260,
        height: 400,
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src={imageURL || "/placeholder.webp"}
        alt={Tittle}
        fill
        style={{ objectFit: "cover" }}
        sizes="100vw"
      />

      {/* Texto encima */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          color: "white",
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {Tittle}
        </Typography>
      </Box>
    </Box>
  );
}
