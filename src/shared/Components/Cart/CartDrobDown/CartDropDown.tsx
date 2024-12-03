import { useContext } from "react"
import Button from "../../Button/Button"
import "./cart-dropdown.styles.scss"
import { CartContext } from "../../../contexts/CartContext"


const CartDropDown = () => {

  const {cartItems} = useContext(CartContext)

  return (
    <div className="cart-dropdown-container ">
      <div className="cart-items">{cartItems.map((item) => (
          <div key={item.id}>{item.name} quantity : {item.quantity}</div>
      ))}
      </div>
      product list will be here
      <Button type="button" buttonType="inverted" className="button-container button">Go To Checkout</Button>
    </div>
  )
}

export default CartDropDown