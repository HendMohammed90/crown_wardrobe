import React from 'react'
import "./CheckoutItem.scss"
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { CartProduct } from '@/shared/types/cart-product';
import { ShopProduct } from '@/shared/types/product';

type CheckoutItemProps = {
    product: CartProduct ,
    removeItemHandler : (item: ShopProduct) => void ,
    addItemHandler : (item: ShopProduct) => void ,
    clearItemHandler : (item: ShopProduct) => void 
}

const CheckoutItem = ({product , removeItemHandler , addItemHandler , clearItemHandler}: CheckoutItemProps) => {
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={product.imageUrl} alt={`${product.name}`} />
            </div>
            <span className='name'> {product.name} </span>
            <span className='quantity'>
                <IoIosArrowBack className='arrow' onClick={() => removeItemHandler(product)}  size={20}/>
                <span className='value'>{product.quantity}</span>
                <IoIosArrowForward className='arrow' onClick={() => addItemHandler(product)} size={20}/>
            </span>
            <span className='price'>{product.price * product.quantity}</span>
            <IoIosClose className='remove-button' onClick={() => clearItemHandler(product)} size={20}/>
        </div>
    );
}

export default CheckoutItem