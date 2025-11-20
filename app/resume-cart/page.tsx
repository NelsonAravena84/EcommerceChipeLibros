"use client";

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import Layout from "../Layout/Layout";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function ResumeCart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <Layout>
      <Box
        sx={{
          bgcolor: "#2b2828ff",
          color: "white",
          p: 6,
          mb: 3,
          mt: 10,
          borderRadius: "4px 4px 0 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} letterSpacing={1}>
          RESUMEN COMPRA
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: 900, mx: "auto", mt: 10 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IMAGEN</TableCell>
              <TableCell>TÍTULO</TableCell>
              <TableCell>CANTIDAD</TableCell>
              <TableCell>PRECIO</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* 👇 Si el carrito está vacío, mostramos el mensaje */}
            {cart.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No hay elementos que mostrar, agregue al menos un elemento al carrito.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {/* 👇 Cuando sí hay elementos */}
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    src={item.image || "/sample-book.jpg"}
                    alt={item.name}
                    width={64}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                </TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ minWidth: 32 }}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>

                    <TextField
                      value={item.quantity}
                      size="small"
                      sx={{
                        width: 40,
                        mx: 1,
                        "& input": { textAlign: "center" },
                      }}
                      inputProps={{ readOnly: true }}
                    />

                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ minWidth: 32 }}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>

                <TableCell>${item.price.toLocaleString()}</TableCell>

                <TableCell>
                  ${(item.price * item.quantity).toLocaleString()}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Si el carrito está vacío, no mostrar botones */}
        {cart.length > 0 && (
          <Box display="flex" justifyContent="center" gap={2} py={4}>
            <Button variant="contained" sx={{ bgcolor: "#393939" }}>
              Seguir comprando
            </Button>

            <Link href={`/checkout/`}>
            <Button variant="contained" sx={{ bgcolor: "black" }}>
              Comprar
            </Button>
            </Link>
          </Box>
        )}
      </TableContainer>
    </Layout>
  );
}
