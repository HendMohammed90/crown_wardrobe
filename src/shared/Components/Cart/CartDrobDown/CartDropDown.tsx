import { useContext } from "react"
import Button from "../../Button/Button"
import { CartContext } from "../../../contexts/CartContext"
import "./cart-dropdown.styles.scss"
import CartItem from "../CartItem/CartItem"
import { Link } from "react-router-dom"


const CartDropDown = () => {

  const { cartItems } = useContext(CartContext)

  return (
    <div className="cart-dropdown-container ">
      <div className="cart-items">{cartItems.length === 0 ? (
        <p>Product list is Empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            imageUrl={item.imageUrl}
            price={item.price}
            name={item.name}
            quantity={item.quantity}
          />
        ))
      )}
      </div>
      <Link className="nav-link" to={"/checkout"}>
        <Button type="button" buttonType="inverted" className="button-container button">
          Go To Checkout
        </Button>
      </Link>
    </div>
  )
}

export default CartDropDown