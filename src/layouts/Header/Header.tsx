import "./Header.scss"
import { Link } from "@mongez/react-router"
// import { ReactComponent as Logo } from "../../assets/crown.svg"
import crownSvg from "../../assets/crown.svg";
import { UserContext } from "../../shared/contexts/user.context";
import { useContext } from "react";
import { signOut } from "firebase/auth";

export default function Header() {

  const userData = useContext(UserContext);
  // console.log(`userData is ${JSON.stringify(userData)}`)

  const {setCurrentUser} = useContext(UserContext);

  const signOutHandler = async()=> {
    await signOut;
    setCurrentUser(null)

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
          ) : ( <Link className="nav-link" to={"/auth"}>
            SIGN IN
          </Link>)}
         
        </div>
      </div>
    </>
  )
}


