import "./cart-icon.styles.scss"
import cartIcon from "../../../../assets/shopping-bag.svg";



const CartIcon = ({ toggleCartView, cartState }: { toggleCartView: (state: boolean) => void; cartState: boolean }) => {

  return (
    <div className="cart-icon-container" onClick={() => toggleCartView(!cartState)}>
        <img className="shopping-icon" src={cartIcon} alt="logo" />
        <span className="item-count">10</span>
    </div>
  )
}

export default CartIcon