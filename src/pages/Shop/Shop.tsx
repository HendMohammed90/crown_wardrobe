import {ProductsContext} from "../../shared/contexts/products.context"
import { useContext } from "react"

export default function Shop() {

    const products = useContext(ProductsContext)

    return (
        <div>{products.shopProducts.map((product) => (
            <div key={product.id}>{product.name}</div>
        ))}</div>
    )
}

