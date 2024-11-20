import React, { useEffect } from "react";
import { createContext , useState } from "react";
import shopData  from "../../utils/shop-data.json"
import { ShopProduct } from "@/shared/types/product"


export const ProductsContext = createContext<{
    shopProducts: ShopProduct[];
    setShopProducts: React.Dispatch<React.SetStateAction<ShopProduct[]>>;
}>({
    shopProducts: [],
    setShopProducts: () => {}
});

export const ProductsProvider = ({children}: {children: React.ReactNode}) => {
    const [shopProducts, setShopProducts] = useState<ShopProduct[]>([]);
    useEffect(() => {
        setShopProducts(shopData);
    }, []);

    const value = { shopProducts, setShopProducts };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}