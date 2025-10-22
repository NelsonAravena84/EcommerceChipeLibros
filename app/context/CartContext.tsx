'use client'

import React, { createContext, useState, useContext, ReactNode} from "react";

export interface Product {
    id: number;
    name: string;
    price: number;
}


interface CartContextType {
    cart: Product[];
    addToCart: (product:Product) => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children} :{children: ReactNode}) =>{
    const [cart, setCart] = useState<Product[]>([]);


    const addToCart = (product: Product) => {
        setCart((prev) => [...prev, product]);
    };


    return (
        <CartContext.Provider value = {{ cart, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
    return context
}