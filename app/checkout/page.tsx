"use client";

import Layout from "../Layout/Layout";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import Image from "next/image";

function CheckOutDesktop() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const descuento = 0;
  const costoEnvio = 889;
  const total = subtotal - descuento + costoEnvio;

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#2b2828ff",
          color: "white",
          p: 6,
          mt: 10,
          borderRadius: "4px 4px 0 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} letterSpacing={1}>
          CHECKOUT
        </Typography>
      </Box>

      <Grid container spacing={29} sx={{ justifyContent: "center" }}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={6} sx={{ flexGrow: 2, mt: 15, mb: 5, ml: 15 }}>
          {/* Contacto */}
          <Box mb={4}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{ color: "black" }}
            >
              1 · Contacto
            </Typography>

            <Box sx={{ display: "grid", gap: 4 }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  E-mail
                </Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Número de contacto
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Box>
          </Box>

          {/* Dirección */}
          <Box sx={{ display: "grid" }}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{ color: "black" }}
            >
              2 · Dirección de envío
            </Typography>

            <Grid container spacing={2}>
              <Grid item sx={{ width: "30%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Nombre
                </Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item sx={{ width: "30%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Apellido
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sx={{ width: "61%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Región
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sx={{ width: "61%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Ciudad
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sx={{ width: "61%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Dirección
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sx={{ width: "61%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Código postal
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sx={{ width: "61%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Apartamento, casa, puerta, etc. (Opcional)
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item sx={{ width: "61%" }}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Comentarios (Opcional)
                </Typography>
                <TextField fullWidth multiline rows={4} />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            backgroundColor: "#E3E3E3",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            elevation={2}
            sx={{
              textAlign: "center",
              backgroundColor: "transparent",
              boxShadow: "none",
              mt: 10,
              width: "70%",
            }}
          >
            <CardContent>
              {cart.length === 0 && (
                <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                  Tu carrito está vacío.
                </Typography>
              )}

              <Box
                sx={{
                  maxHeight: cart.length > 3 ? 300 : "auto",
                  overflowY: cart.length > 3 ? "auto" : "visible",
                  pr: 1,
                }}
              >
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                      p: 1.5,
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Image
                      src={item.image || "/sample-book.jpg"}
                      alt={item.name}
                      width={60}
                      height={85}
                      style={{
                        borderRadius: 4,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={700} fontSize={14}>
                        {item.name}
                      </Typography>
                      {item.author && (
                        <Typography fontSize={12} color="text.secondary">
                          {item.author}
                        </Typography>
                      )}
                      <Typography fontSize={12} mt={0.5}>
                        Cantidad: <b>{item.quantity}</b>
                      </Typography>
                    </Box>

                    <Typography fontWeight={700} fontSize={14}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {cart.length > 0 && (
                <>
                  <Box sx={{ display: "flex", mt: 3 }}>
                    <TextField fullWidth label="Código de descuento" />
                    <Button variant="contained" sx={{ bgcolor: "black", ml: 1 }}>
                      Aplicar
                    </Button>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toLocaleString()}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Descuento</Typography>
                    <Typography>-${descuento.toLocaleString()}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography>Costo de envío</Typography>
                    <Typography>${costoEnvio.toLocaleString()}</Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box display="flex" justifyContent="space-between" mb={3}>
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>${total.toLocaleString()}</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ bgcolor: "black" }}
                  >
                    Continuar con el pago
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function CheckOutMobile() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const descuento = 0;
  const costoEnvio = 889;
  const total = subtotal - descuento + costoEnvio;

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#2b2828ff",
          color: "white",
          p: 4,
          mt: 5,
          borderRadius: "4px 4px 0 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} letterSpacing={1}>
          CHECKOUT
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sx={{ px: 2, mt: 3 }}>
          {/* Contacto */}
          <Box mb={3}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{ color: "black" }}
            >
              1 · Contacto
            </Typography>

            <Box sx={{ display: "grid", gap: 3 }}>
              <Box>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  E-mail
                </Typography>
                <TextField fullWidth />
              </Box>

              <Box>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Número de contacto
                </Typography>
                <TextField fullWidth />
              </Box>
            </Box>
          </Box>

          {/* Dirección */}
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{ color: "black" }}
            >
              2 · Dirección de envío
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Nombre
                </Typography>
                <TextField fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Apellido
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Región
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Ciudad
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Dirección
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Código postal
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Apartamento, casa, puerta, etc. (Opcional)
                </Typography>
                <TextField fullWidth />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography fontSize={14} sx={{ fontWeight: 500, color: "black" }}>
                  Comentarios (Opcional)
                </Typography>
                <TextField fullWidth multiline rows={4} />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#E3E3E3",
            mt: 4,
            px: 2,
            borderRadius: 1,
          }}
        >
          <Card elevation={2} sx={{ boxShadow: "none", backgroundColor: "transparent" }}>
            <CardContent>
              {cart.length === 0 && (
                <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                  Tu carrito está vacío.
                </Typography>
              )}

              <Box
                sx={{
                  maxHeight: cart.length > 3 ? 300 : "auto",
                  overflowY: cart.length > 3 ? "auto" : "visible",
                  pr: 1,
                }}
              >
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                      p: 1.5,
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Image
                      src={item.image || "/sample-book.jpg"}
                      alt={item.name}
                      width={60}
                      height={85}
                      style={{
                        borderRadius: 4,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={700} fontSize={14}>
                        {item.name}
                      </Typography>
                      {item.author && (
                        <Typography fontSize={12} color="text.secondary">
                          {item.author}
                        </Typography>
                      )}
                      <Typography fontSize={12} mt={0.5}>
                        Cantidad: <b>{item.quantity}</b>
                      </Typography>
                    </Box>

                    <Typography fontWeight={700} fontSize={14}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {cart.length > 0 && (
                <>
                  <Box sx={{ display: "flex", mt: 3 }}>
                    <TextField fullWidth label="Código de descuento" />
                    <Button variant="contained" sx={{ bgcolor: "black", ml: 1 }}>
                      Aplicar
                    </Button>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toLocaleString()}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Descuento</Typography>
                    <Typography>-${descuento.toLocaleString()}</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography>Costo de envío</Typography>
                    <Typography>${costoEnvio.toLocaleString()}</Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box display="flex" justifyContent="space-between" mb={3}>
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>${total.toLocaleString()}</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ bgcolor: "black" }}
                  >
                    Continuar con el pago
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function ResponsiveCheckOut() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Layout>
      {isMobile ? <CheckOutMobile /> : <CheckOutDesktop />}
    </Layout>
  );
}
