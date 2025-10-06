import { Avatar, Box, Divider, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import UserIcon from "../(CSR(Components))/UserIcon";
import CartIcon from "../(CSR(Components))/CartIcon";
import HeartIcon from "../(CSR(Components))/HeartIcon";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "iconoir-react";

interface MyComponentProps {
    children: any;
}

export default function Layout({ children }: MyComponentProps) {
    return (
        <>
            {/* Navbar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 50 }}>
                <Box sx={{ mt: 4, mb: 4 }}>
                    <TextField sx={{ width: 400 }}>
                        Buscar
                    </TextField>
                </Box>

                <Box sx={{ mt: 3, mb: 3 }}>
                    <Image
                        className="d"
                        src="/LogoPagina.webp"
                        alt="logo de la pagina"
                        width={300}
                        height={70}
                        priority
                    />

                </Box>

                <Box sx={{ display: 'flex', mt: 5, mb: 4, gap: 4 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                        <Typography variant="body1" sx={{ color: '#000000', mt: 2 }}>
                            Acceso
                        </Typography>
                        <UserIcon />
                    </Box>
                    <CartIcon />
                    <HeartIcon />
                </Box>
            </Box>

            <Box sx={{ border: 40, borderColor: '#322F2F' }}>
                <Box sx={{ backgroundColor: '#322F2F', display: 'flex', gap: 4, justifyContent: 'center' }}>
                    <Link href={"/"}>INICIO</Link>
                    <Link href={"/pages/categorias"}>CATEGORIAS</Link>
                    <Link href={"/destacados"}>DESTACADOS</Link>
                    <Link href={"/destacados"}>PACKS</Link>
                    <Link href={"/destacados"}>CONTACTO</Link>
                </Box>
            </Box>

            {children}

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: '#322F2F',
                    color: 'white',
                    mt: 9,
                    py: 4,
                    px: { xs: 2, sm: 4, md: 8 },
                }}
            >
                {/* Contenido principal */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 3, sm: 5 }}
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    {/* Sección info (logo a la izquierda) */}
                    <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 250 } }}>
                        <Image
                            src="/LogoPagina.webp"
                            alt="logo de la pagina"
                            width={300}
                            height={70}
                            priority
                        />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            En Chipe Libros te acercamos a nuevas historias: literatura, filosofía, historia y mucho más.
                            Envíos a todo Chile, compra segura, rápida y sin complicaciones.
                        </Typography>

                        <Box sx={{display:'flex', mt:3, gap:1}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Box>

                    </Box>

                    {/* Sección enlaces (centro) */}
                    <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Términos y Condiciones
                        </Typography>
                        <Typography variant="body2">Política de privacidad</Typography>
                        <Typography variant="body2">Devoluciones y cambios</Typography>
                        <Typography variant="body2">Preguntas frecuentes</Typography>
                    </Box>

                    {/* Sección redes / más info (derecha) */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" gutterBottom>
                            Más información
                        </Typography>
                        <Typography variant="body2">
                            Atendemos de lunes a sábado. ¿Tienes dudas? <br />
                            ¡Escríbenos por WhatsApp o en nuestras redes sociales!
                        </Typography>
                        <Image
                            src="/webpayicon.webp"
                            alt="icono webpay"
                            width={180}
                            height={60}
                            priority
                        />
                    </Box>
                </Stack>

                {/* Divider y copyright */}
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.5)' }} />
                <Typography variant="body2" textAlign="center">
                    © {new Date().getFullYear()} Chipe/Libros. Todos los derechos reservados.
                </Typography>
            </Box>

        </>

    )
}