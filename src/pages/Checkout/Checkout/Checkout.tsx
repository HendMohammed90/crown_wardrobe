import { ShopProduct } from "@/shared/types/product";
import { CartContext } from "../../../shared/contexts/CartContext";
import { useContext } from "react"
import CheckoutItem from "../CheckoutItem";
import "./Checkout.scss"





const Checkout = () => {

    const { cartItems, addToCart, removeFromCart ,clearItemFromCart, cartTotalPrice} = useContext(CartContext);


    const handelIncrementProductCount = (item: ShopProduct) => {
        addToCart(item);
    }

    const handelDecrementProductCount = (item: ShopProduct) => {
        removeFromCart(item);
    }

    const handelRemoveProduct = (item: ShopProduct) => {
        clearItemFromCart(item);
    }

    return (
        <div className="checkout-container" >
            <div className="checkout-header"> 
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>

                {cartItems.map((item) => (
                        <CheckoutItem key={item.id} product={item} removeItemHandler={handelDecrementProductCount} addItemHandler={handelIncrementProductCount} clearItemHandler={handelRemoveProduct} />
                ))}
                
                <div className='total'>TOTAL: ${cartTotalPrice}</div>
            </div>
    )
}

export default Checkout