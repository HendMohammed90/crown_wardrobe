import { Link, Outlet } from "react-router-dom"
import "./Navigation.scss"
import { Fragment } from "react"
// import CrownLogo from "../../assets/crown.svg"
import CrownLogo from "../../assets/crown.svg?react"; 
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link to={"/"} className="logo-container">
          <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/home"}>
            shop
          </Link>
        </div>
      </div>
    <Outlet />
    </Fragment>
    )
}

export default Navigation