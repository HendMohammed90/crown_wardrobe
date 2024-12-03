import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { ShopProduct } from "../types/product";
import { CartProduct } from "../types/cart-product";


export const addCartItem = (cartItems: CartProduct[], productToAdd: ShopProduct): CartProduct[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};


export const CartContext = createContext<{
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void,
    cartItems: CartProduct[];
    addToCart: (product: ShopProduct) => void;
    removeFromCart : (product: ShopProduct) => void;
    cartCount : number
}>({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    cartCount : 0
});

export const CartProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [cartCount , setCartCount] = useState(0);


    useEffect(()=>{
        const newCartCount = cartItems.reduce((previous , cartCount) => previous + cartCount.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems])

    // (prevItems) => addCartItem(prevItems, product)
    const addToCart = (product: ShopProduct) => {
        setCartItems(addCartItem(cartItems, product));
        // setCartCount(cartCount + 1)
        // console.log(`the product added ${JSON.stringify(product)}`)
        // console.log(`cart items now become => ${JSON.stringify(cartItems)}`)
    }

    const removeFromCart = (product: ShopProduct) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find((item) => item.id === product.id);
            if (existingProduct && existingProduct.quantity > 1) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prevItems.filter((item) => item.id !== product.id);
        });
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addToCart , removeFromCart , cartCount};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}