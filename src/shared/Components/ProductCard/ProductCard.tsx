import { ShopProduct } from "@/shared/types/product"
import Button from "../Button/Button"
import {CartContext} from "../../contexts/CartContext";
import { useContext } from "react";
import "./product-card.styles.scss"

type ProductCardProps = {
  product: ShopProduct
}

const ProductCard = ({ product }: ProductCardProps) => {

  const { addToCart} = useContext(CartContext);

  const handelAddToCart = ()=>{
    // TODO: add notification fire here
    // console.log('Adding to the cart')
    addToCart(product);
  }


  return (
    <div className='product-card-container'>
      <img className="img" src={product.imageUrl} />
      <div className='footer'>
        <p className='name'>{product.name}</p>
        <span className='price'>{product.price}</span>
      </div>
      <Button type="button" buttonType="inverted" className="button button-container" onClick={handelAddToCart}>Add to card</Button>
    </div>
  )
}

export default ProductCard