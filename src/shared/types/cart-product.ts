import { ShopProduct } from "./product";

// Extend ShopProduct to include a quantity property
export type CartProduct = ShopProduct & {
    quantity: number;
};