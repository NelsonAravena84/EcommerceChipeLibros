'use client';
import { User } from "iconoir-react";

interface UserIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export default function UserIcon({ color = "black", width = 40, height = 40 }: UserIconProps) {
  return (
    <User color={color} width={width} height={height} />
  );
}
