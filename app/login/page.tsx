"use client";

import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import Layout from "../Layout/Layout"
import { GoogleLogin } from "@react-oauth/google";


export default function loginpage() {
    return (
        <Layout>
            <Typography variant="h5" sx={{ color: 'black', textAlign: 'center', mt: 6 }}>
                INICIO DE SESIÓN
            </Typography>

            <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center', mt: 5 }}>

                <Box>
                    <Typography variant="h5" sx={{ color: 'black' }}>
                        Clientes registrados
                    </Typography>

                    <Typography variant="h6" sx={{ color: 'black', maxWidth: "600px" }}>
                        Si tiene una cuenta, inicie sesión con su dirección de
                        correo electrónico
                    </Typography>

                    <Box sx={{ mt: 4, display: 'grid', gap: 2 }}>
                        <Typography sx={{ color: 'black' }}>
                            Correo Electronico
                        </Typography>
                        <TextField fullWidth id="FormularioCorreo" />
                    </Box>

                    <Box sx={{ mt: 4, display: 'grid', gap: 2 }}>
                        <Typography sx={{ color: 'black' }}>
                            Contraseña
                        </Typography>
                        <TextField fullWidth id="FormularioContraseña" />
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 4 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "black",
                                color: "white"
                            }}
                        >Ingresar
                        </Button>

                        <Box sx={{ alignContent: 'center' }}>
                            <Typography variant="body1" sx={{ color: 'black' }}>
                                ¿Olvido su contraseña?
                            </Typography>
                        </Box>

                    </Box>


                    <Box sx={{ mt: 5, display: 'grid', gap: 4 }}>

                        <Typography variant="body1" sx={{ color: 'black' }}>
                            O </Typography>

                        <GoogleLogin
                            onSuccess={() => { }} // función vacía obligatoria
                            onError={() => { }}   // opcional, pero buena práctica
                            shape="pill"
                            theme="outline"
                            size="large"
                            width="600px"
                            useOneTap={false}
                        />
                    </Box>
                </Box>


                <Divider orientation="vertical" flexItem sx={{ color: 'black' }} />


                <Box>
                    <Typography variant="h5" sx={{ color: 'black' }}>
                        Nuevos Clientes
                    </Typography>


                    <Typography variant="h6" sx={{ color: 'black', maxWidth: "600px" }}>
                        Registrarte es muy útil: compras más ágiles, posibilidad de guardar tus direcciones favoritas, revisar el estado de tus pedidos.
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: "black",
                            color: "white"
                        }}
                    >Crear una cuenta
                    </Button>

                </Box>
            </Box>
        </Layout>
    )
}