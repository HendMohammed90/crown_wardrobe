import "./cart-icon.styles.scss"
import cartIcon from "../../../../assets/shopping-bag.svg";


type CartIconProps = {
  toggleCartView: (state: boolean) => void,
  cartState: boolean,
  numberOfProduct: number,
}


const CartIcon = ({ toggleCartView, cartState , numberOfProduct }:CartIconProps) => {

  return (
    <div className="cart-icon-container" onClick={() => toggleCartView(!cartState)}>
        <img className="shopping-icon" src={cartIcon} alt="logo" />
        <span className="item-count">{numberOfProduct}</span>
    </div>
  )
}

export default CartIcon