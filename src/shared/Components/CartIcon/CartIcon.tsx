import "./cart-icon.styles.scss"
import cartIcon from "../../../assets/shopping-bag.svg";



const CartIcon = () => {
  return (
    <div className="cart-icon-container">
        <img className="shopping-icon" src={cartIcon} alt="logo" />
        <span className="item-count">10</span>
    </div>
  )
}

export default CartIcon