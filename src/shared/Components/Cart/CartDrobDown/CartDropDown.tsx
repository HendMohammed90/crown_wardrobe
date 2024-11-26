import Button from "../../Button/Button"
import "./cart-dropdown.styles.scss"
import {ShopProduct} from "../../../types/product"

const CartDropDown = ({cartProduct}:{cartProduct: ShopProduct[]}) => {

  if (!cartProduct) return null; // Handle undefined case

  console.log(`CartContext data is ${JSON.stringify(cartProduct)}`)

  return (
    <div className="cart-dropdown-container ">
      <div className="cart-items">{cartProduct.map((item) => (
          <div key={item.id}>{item.name}</div>
      ))}
      </div>
      <Button type="button" buttonType="inverted" className="button-container button">Go To Checkout</Button>
    </div>
  )
}

export default CartDropDown