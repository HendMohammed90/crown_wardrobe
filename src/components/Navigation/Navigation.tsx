import { Outlet } from "react-router-dom"
import "./Navigation.scss"
const Navigation = () => {
  return (
    <>
    <div>Navigation Bar</div>
    <Outlet />
    </>
    )
}

export default Navigation