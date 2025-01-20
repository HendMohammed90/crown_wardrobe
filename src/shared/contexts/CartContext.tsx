import React, { useReducer } from "react";
import { createContext } from "react";
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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    ADD_ITEM_TO_CART : 'ADD_ITEMS_TO_CART',
    REMOVE_ITEM_FROM_CART : 'REMOVE_ITEM_FROM_CART',
    CLEAR_ITEM_FROM_CART : 'CLEAR_ITEM_FROM_CART',
    UPDATE_CART_COUNT: 'UPDATE_CART_COUNT',
    UPDATE_CART_TOTAL_PRICE: 'UPDATE_CART_TOTAL_PRICE',
    OPEN_CART : 'OPEN_CART',
    CLOSE_CART : 'CLOSE_CART',
}

export const cartReducers = (state : CartState ,action: { type: string; payload?: CartActionPayload }) =>{
    const {type , payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducers`);
    }
}

const INITIAL_STATE = {
    cartItems: [],
    cartCount : 0,
    cartTotalPrice: 0,
    isCartOpen: true,
}

export const CartProductsProvider = ({ children }: { children: React.ReactNode }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    // const [cartCount , setCartCount] = useState(0);
    // const [cartTotalPrice , setCartTotalPrice] = useState(0);

    const [{cartItems , cartCount , cartTotalPrice , isCartOpen}, dispatch] = useReducer(cartReducers, INITIAL_STATE);
    
    const updateCartItemsReducer = (newCartItem: CartProduct[]) => {
        const newCartCount = newCartItem.reduce((previous , newCartCount) => previous + newCartCount.quantity , 0);
        const totalPrices = newCartItem.map((item) => {return (item.price*item.quantity)})  
        const newCartTotalPrice = totalPrices.reduce((previous , newItem) => previous + newItem , 0);
        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems : newCartItem , cartCount:  newCartCount ,cartTotalPrice :newCartTotalPrice} });
    }

    const addToCart = (product: ShopProduct) => {
        const newCartItem = (addCartItem(cartItems, product));
        updateCartItemsReducer(newCartItem);
    }

    const removeFromCart = (product: ShopProduct) => {
        const newCartItem = ((prevItems:CartProduct[]) => {
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
        updateCartItemsReducer(newCartItem(cartItems));

    };

    const clearItemFromCart = (product: ShopProduct) => {
        const newCartItem = ((prevItems:CartProduct[]) => {
            return prevItems.filter((item) => item.id !== product.id);
        });
        updateCartItemsReducer(newCartItem(cartItems));

    }

    const value = { isCartOpen, setIsCartOpen : ()=>{}, cartItems, addToCart , removeFromCart , clearItemFromCart ,cartCount , cartTotalPrice};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}

interface CartState {
    cartItems: CartProduct[];
    cartCount: number;
    cartTotalPrice: number;
    isCartOpen: boolean;
}
type CartActionPayload = 
    | { cartItems: CartProduct[]; cartCount: number; cartTotalPrice: number } // for SET_CART_ITEMS
    | { cartCount: number } // for UPDATE_CART_COUNT
    | { cartTotalPrice: number }; // for UPDATE_CART_TOTAL_PRICE