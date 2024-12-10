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

export const totalCartPrice = (cartItems : CartProduct[]):number =>{
    const totalPrices = cartItems.map((item) => {return (item.price*item.quantity)})  
    // console.log(`totalPrices : ${totalPrices}`);
    const newCartPrice = totalPrices.reduce((previous , newItem) => previous + newItem , 0);
    // console.log(`newCartPrice : ${newCartPrice}`);
    return newCartPrice

}

export const CartContext = createContext<{
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void,
    cartItems: CartProduct[];
    addToCart: (product: ShopProduct) => void;
    removeFromCart : (product: ShopProduct) => void;
    clearItemFromCart :(product: ShopProduct) => void;
    cartCount : number,
    cartTotalPrice: number
}>({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearItemFromCart:  () => { },
    cartCount : 0,
    cartTotalPrice: 0
});

export const CartProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [cartCount , setCartCount] = useState(0);
    const [cartTotalPrice , setCartTotalPrice] = useState(0);

    
    useEffect(()=>{
        const newCartCount = cartItems.reduce((previous , cartCount) => previous + cartCount.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems , cartCount])

    useEffect(()=>{
        const totalPrice = totalCartPrice(cartItems);
        setCartTotalPrice(totalPrice)
    },[cartItems])

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

    const clearItemFromCart = (product: ShopProduct) => {
        setCartItems((prevItems) => {
            // const existingProduct = prevItems.find((item) => item.id === product.id);
            // if (existingProduct && existingProduct.quantity > 1) {
            //     return prevItems.map((item) =>
            //         item.id === product.id
            //             ? { ...item, quantity: item.quantity - 1 }
            //             : item
            //     );
            // }
            return prevItems.filter((item) => item.id !== product.id);
        });
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addToCart , removeFromCart , clearItemFromCart ,cartCount , cartTotalPrice};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}