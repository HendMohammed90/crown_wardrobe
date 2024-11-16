import React, { useEffect } from "react";
import { createContext , useState } from "react";
import shopData  from "../../utils/shop-data.json"

type ShopProduct = { id: number; name: string; imageUrl: string; price: number; };

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