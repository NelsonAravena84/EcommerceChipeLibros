'use client';
import { Cart } from "iconoir-react";

interface CartIconnProps {
  color?: string;
  width?: number;
  height?: number;
}

export default function CartIcon({ color = "black", width = 40, height = 40 }: CartIconnProps) {
  return (
    <Cart color={color} width={width} height={height} />
  );
}
