import { Box, TextField, Typography, Button } from "@mui/material"
import Layout from "../Layout/Layout"

export default function SearchOrder() {
    return (
        <Layout>
            <Box sx={{ display: 'grid', color: 'black', justifyContent: 'center', mt: 8, gap: 2 }}>
                <Typography variant='h5' sx={{ textAlign: 'center' }}>
                    BUSCAR PEDIDO
                </Typography>

                <Typography variant='h6'>
                    Introduzca el código de seguimiento de su pedido para comprobar el estado de su envío                </Typography>
                <Box sx={{ mt: 4, display: 'grid', gap: 2 }}>
                    <Typography sx={{ color: 'black' }}>
                        Número de Pedido
                    </Typography>
                    <TextField fullWidth id="FormularioCorreo" />
                </Box>


                <Box sx={{ mt: 3, display: 'flex', gap: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "black",
                            color: "white"
                        }}
                    >Buscar
                    </Button>

                     <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "white",
                            color: "black"
                        }}
                    >Limpiar
                    </Button>
                </Box>
            </Box>
        </Layout>
    )
}