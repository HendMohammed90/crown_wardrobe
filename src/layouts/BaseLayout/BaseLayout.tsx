import { CartProductsProvider } from "../../shared/contexts/CartContext";
import { CategoriesProvider } from "../../shared/contexts/CategoryContext";
import { UserProvider } from "../../shared/contexts/user.context";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

/**
 * Base layout can be used to wrap all pages
 */
export default function BaseLayout() {
    return (
        <UserProvider>
            <CategoriesProvider>
                <CartProductsProvider>
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                </CartProductsProvider>
            </CategoriesProvider>
        </UserProvider>
    );
}