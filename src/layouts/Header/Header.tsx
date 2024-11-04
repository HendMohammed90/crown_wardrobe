import "./Header.scss"
import { Link } from "@mongez/react-router"
// import { ReactComponent as Logo } from "../../assets/crown.svg"
import crownSvg from "../../assets/crown.svg";


export default function Header() {
  return (
    <>
      <div className="navigation">
        <Link to={"/"} className="logo-container">
          <img src={crownSvg} alt="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          <Link className="nav-link" to={"/auth"}>
            SIGN IN
          </Link>
        </div>
      </div>
    </>
  )
}


