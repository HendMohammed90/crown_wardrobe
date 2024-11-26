import { CartProductsProvider } from "../../shared/contexts/CartContext";
import { ProductsProvider } from "../../shared/contexts/products.context";
import { UserProvider } from "../../shared/contexts/user.context"
import Header from "../Header/Header";

type BaseLayoutProps = {
    children: React.ReactNode;
};

/**
 * Base layout can be used to wrap all pages
 */
export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <UserProvider>
            <ProductsProvider>
                <CartProductsProvider>
                <Header />
                <main>{children}</main>
                </CartProductsProvider>
            </ProductsProvider>
        </UserProvider>
    );
}