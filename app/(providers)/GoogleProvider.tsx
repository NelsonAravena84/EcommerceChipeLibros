"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function GoogleProvider({ children }: Props) {
  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
      {children}
    </GoogleOAuthProvider>
  );
}
