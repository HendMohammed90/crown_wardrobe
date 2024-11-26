import React, { useEffect } from "react";
import { createContext , useState } from "react";
import shopData  from "../../utils/shop-data.json"
import { ShopProduct } from "../types/product";


export const CartContext = createContext<{
    isCartOpen : boolean;
    ShopCartProducts: ShopProduct[];
    setShopCartProducts: React.Dispatch<React.SetStateAction<ShopProduct[]>>;
}>({
    isCartOpen: false,
    ShopCartProducts: [],
    setShopCartProducts: () => {}
});

export const CartProductsProvider = ({children}:{children: React.ReactNode}) =>{
    const [ShopCartProducts , setShopCartProducts] = useState<ShopProduct[]>([]);

    useEffect(()=>{
        setShopCartProducts(shopData)
    }, [])

    const value = { isCartOpen: false, ShopCartProducts, setShopCartProducts };


    return<CartContext.Provider value={value}>{children}</CartContext.Provider>

}