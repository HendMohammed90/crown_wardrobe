import "./Header.scss"
import { Link } from "@mongez/react-router"
// import { ReactComponent as Logo } from "../../assets/crown.svg"
import crownSvg from "../../assets/crown.svg";
import { UserContext } from "../../shared/contexts/user.context";
import { CartContext } from "../../shared/contexts/CartContext";
import { useContext, useState } from "react";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../shared/Components/Cart/CartIcon/CartIcon";
import CartDropDown from "../../shared/Components/Cart/CartDrobDown/CartDropDown";


export default function Header() {

  const userData = useContext(UserContext);
  // console.log(`userData is ${JSON.stringify(userData)}`)

  const { isCartOpen } = useContext(CartContext);
  const [cartState, setCartState] = useState(isCartOpen)
  // console.log(`cartState is => ${cartState}`)

  const signOutHandler = () => {
    signOutUser()
  }

  const handelToggleCart = () => {
    setCartState(prevState => !prevState); // Update to toggle based on previous state
  }

  return (
    <>
      <div className="navigation">
        {/* {userData.currentUser !== null && <p>{userData.currentUser}</p>} */}
        <Link to={"/"} className="logo-container">
          <img src={crownSvg} alt="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          {userData?.currentUser !== null && userData?.currentUser?.user !== null ? (
            <span className="nav-link" onClick={signOutHandler}> SIGN OUT</span>
          ) : (<Link className="nav-link" to={"/auth"}>
            SIGN IN
          </Link>)}
          <CartIcon toggleCartView={handelToggleCart} cartState={cartState} />
        </div>
        {cartState && <CartDropDown />}
      </div>
    </>
  )
}


