import ProductCard from "../../shared/Components/ProductCard/ProductCard"
import {ProductsContext} from "../../shared/contexts/products.context"
import { useContext } from "react"
import "./Shop.scss"

export default function Shop() {

    const products = useContext(ProductsContext)

    return (
        <div className="product-container">{products.shopProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}</div>
    )
}

