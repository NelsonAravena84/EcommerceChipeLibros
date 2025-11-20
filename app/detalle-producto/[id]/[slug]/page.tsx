'use client';

import { useCart } from "@/app/context/CartContext";
import { obtenerProductoPorID } from "@/lib/productosApi";
import Layout from "@/app/Layout/Layout";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import ProductCard from "@/app/(CSR(Components))/(productcard)/Productcard";
import { useParams } from 'next/navigation'; // 👈 Importar hook

export default function DetailsPage() {
  const params = useParams(); // 👈 Usar hook
  const productId = Number(params.id); // ahora ya se puede acceder

  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await obtenerProductoPorID(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error cargando producto", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Error al cargar el producto</p>;

  return (
    <Layout>
      <Grid
        container
        spacing={4}
        sx={{ mt: { xs: 3, md: 8, xl: 20 }, mb: 2, justifyContent: "center" }}
      >
        {/* Imagen */}
        <Grid item xs={12} md={5}>
          <Card sx={{ maxWidth: 350, boxShadow: 2 }}>
            <CardMedia
              component="img"
              image={product.image_url}
              alt={product.nombre}
              sx={{
                height: 480,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Card>
        </Grid>

        {/* Ficha */}
        <Grid item xs={12} md={7}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 400, mb: 0.7 }}>
                {product.nombre}
              </Typography>

              <Typography variant="subtitle1" sx={{ color: "grey.700", mb: 2 }}>
                {product.autor}
              </Typography>

              <Typography
                sx={{ color: "success.main", fontWeight: 500, mb: 0.5 }}
              >
                Disponible
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#d32f2f", fontWeight: 600, mr: 1 }}
                >
                  ${product.precio}
                </Typography>

                {product.precioOriginal && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "grey.400",
                      textDecoration: "line-through",
                      fontSize: 20,
                    }}
                  >
                    ${product.precioOriginal}
                  </Typography>
                )}
              </Box>

              {/* Cantidad */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  sx={{
                    minWidth: 36,
                    p: 0,
                    color: "#222",
                    border: "1px solid #222",
                    fontWeight: 700,
                    fontSize: 22,
                    borderRadius: 1.2,
                  }}
                >
                  −
                </Button>

                <TextField
                  size="small"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setQuantity(Math.min(product.stock, Math.max(1, value)));
                  }}
                  inputProps={{
                    min: 1,
                    max: product.stock,
                    style: { textAlign: "center", width: 35, padding: 0 },
                  }}
                  sx={{
                    ".MuiInputBase-input": { textAlign: "center", p: 0 },
                    width: 40,
                  }}
                />

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  sx={{
                    minWidth: 36,
                    p: 0,
                    color: "#222",
                    border: "1px solid #222",
                    fontWeight: 700,
                    fontSize: 22,
                    borderRadius: 1.2,
                  }}
                >
                  +
                </Button>
              </Box>

              {/* Agregar al carrito */}
              <Button
                variant="outlined"
                fullWidth
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.nombre,
                    price: product.precio,
                    quantity,
                  })
                }
                sx={{
                  mb: 1.1,
                  backgroundColor: "#fff",
                  color: "#222",
                  border: "1px solid #222",
                  fontWeight: 500,
                  py: 1.15,
                  borderRadius: 0,
                  textTransform: "none",
                  fontSize: 17,
                }}
              >
                Agregar al carrito
              </Button>

              {/* Comprar ahora */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#222",
                  color: "#fff",
                  fontWeight: 500,
                  py: 1.15,
                  borderRadius: 0,
                  boxShadow: "none",
                  fontSize: 17,
                  textTransform: "none",
                }}
              >
                Comprar ahora
              </Button>

              {/* 🎯 FICHA TÉCNICA */}
              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Ficha técnica
              </Typography>

              <Typography sx={{ mb: 0.6 }}>
                <strong>Editorial:</strong> {product.editorial || "—"}
              </Typography>

              <Typography sx={{ mb: 0.6 }}>
                <strong>ISBN:</strong> {product.isbn || "—"}
              </Typography>

              <Typography sx={{ mb: 0.6 }}>
                <strong>Encuadernación:</strong>{" "}
                {product.encuadernacion || "—"}
              </Typography>

              <Typography sx={{ mb: 0.6 }}>
                <strong>Idioma:</strong> {product.idioma || "—"}
              </Typography>

              <Typography sx={{ mb: 0.6 }}>
                <strong>N° de páginas:</strong> {product.paginas || "—"}
              </Typography>

              <Typography sx={{ mb: 0.6 }}>
                <strong>Dimensiones:</strong> {product.dimensiones || "—"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 10 }}>
        <Divider />

        {/* Contenedor centrado */}
        <Box sx={{ textAlign: "center", px: 2, mt: 4 }}>

          {/* Título Sinopsis (centrado) */}
          <Typography variant="h5" sx={{ mb: 1, color: "black", textAlign: "center" }}>
            <strong>Sinopsis</strong>
          </Typography>

          {/* Descripción (justificada) */}
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "black",
              textAlign: "justify",
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet et nulla ac lobortis. Nulla imperdiet pretium metus, ut tincidunt lorem euismod sit amet. Duis venenatis nunc et est feugiat congue. Donec blandit nulla a nulla aliquam, ut hendrerit turpis elementum. Sed egestas at leo eu bibendum. Maecenas in quam sem. Curabitur bibendum felis a tristique blandit.

            Mauris eget commodo magna, ac viverra eros. Sed eget pellentesque magna, dapibus convallis est. Cras ac ligula turpis. Donec ante turpis, sollicitudin ut arcu vitae, sodales semper nibh. Morbi lacinia maximus sem ac scelerisque. Quisque non fermentum lacus, mattis porttitor metus. Sed ullamcorper neque nec dui aliquet, sed aliquam mi cursus. Fusce nec enim accumsan tortor lacinia tincidunt quis a ante. Fusce dapibus efficitur convallis. Praesent ornare ac ligula nec porttitor. In hac habitasse platea dictumst. Nullam sodales lacinia metus nec dignissim. Donec eget facilisis nibh.
          </Typography>

        </Box>

        <Divider />

      </Box>
      
    <Box sx={{mt:13}}>
          <Typography variant="h5" sx={{ mb: 1, color: "black", textAlign: "center" }}>
            <strong>Te podria interesar</strong>
          </Typography>

          <ProductCard categoriaId={4}/>
    </Box>
    </Layout>
  );
}
