'use client';

import { Box, Button, Divider, TextField, Typography, useMediaQuery, Paper } from "@mui/material";
import Layout from "../Layout/Layout";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <Layout>
            <Box sx={{ mt: 6, mb: 10, width: "100%" }}>
                <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', mb: 4, letterSpacing: "1px" }}>
                    INICIO DE SESIÓN
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 4, md: 8 },
                        alignItems: "stretch",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: 1200,
                        mx: "auto",
                        background: "white",
                        p: { xs: 1, sm: 3, md: 6 },
                        borderRadius: 4,
                        boxShadow: { xs: 0, md: 4 },
                    }}
                >
                    {/* Clientes registrados */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            p: { xs: 1, md: 2 },
                        }}
                    >
                        <Typography variant="h5" sx={{ color: 'black', mb: 2 }}>
                            Clientes registrados
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'black', maxWidth: 600, mb: 4 }}>
                            Si tiene una cuenta, inicie sesión con su dirección de correo electrónico
                        </Typography>
                        <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
                            <Typography sx={{ color: 'black' }}>Correo Electrónico</Typography>
                            <TextField fullWidth id="FormularioCorreo" size="small" />
                        </Box>
                        <Box sx={{ mt: 3, display: 'grid', gap: 2 }}>
                            <Typography sx={{ color: 'black' }}>Contraseña</Typography>
                            <TextField fullWidth id="FormularioContraseña" type="password" size="small" />
                        </Box>
                        <Box sx={{ mt: 3, display: 'flex', gap: 3, flexWrap: "wrap" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    px: 4,
                                    boxShadow: 1,
                                    borderRadius: 2,
                                    '&:hover': { backgroundColor: "#212121" }
                                }}
                            >
                                Ingresar
                            </Button>
                            <Box sx={{ alignContent: 'center' }}>
                                <Typography variant="body1" sx={{ color: 'black', fontSize: "0.96rem" }}>
                                    ¿Olvidó su contraseña?
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 5, display: 'grid', gap: 4 }}>
                            <Typography variant="body1" sx={{ color: 'black', fontWeight: 600 }}>
                                O
                            </Typography>
                            <Box sx={{ width: "100%" }}>
                                <GoogleLogin
                                    onSuccess={() => { }}
                                    onError={() => { }}
                                    shape="pill"
                                    theme="outline"
                                    size="large"
                                    width="100%"
                                    useOneTap={false}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Divider solo en desktop */}
                    <Divider
                        orientation={isMobile ? "horizontal" : "vertical"}
                        flexItem
                        sx={{
                            mx: isMobile ? 0 : 2,
                            my: isMobile ? 2 : 0,
                            bgcolor: '#ccc'
                        }}
                    />

                    {/* Nuevos clientes */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            p: { xs: 1, md: 2 },
                            borderLeft: { md: "none" },
                            mt: { xs: 5, md: 0 }
                        }}
                    >
                        <Typography variant="h5" sx={{ color: 'black', mb: 2 }}>
                            Nuevos Clientes
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'black', maxWidth: 600, mb: 4 }}>
                            Registrarte es muy útil: compras más ágiles, posibilidad de guardar tus direcciones favoritas, revisar el estado de tus pedidos.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: 600,
                                px: 4,
                                borderRadius: 2,
                                boxShadow: 1,
                                '&:hover': { backgroundColor: "#222" }
                            }}
                        >
                            Crear una cuenta
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}
