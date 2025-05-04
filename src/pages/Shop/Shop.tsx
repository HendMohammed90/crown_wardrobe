import CategoryPreview from "./components/CategoriesPreview/CategoriesPreview"
import { CategoryContext } from "../../shared/contexts/CategoryContext"
import { useContext } from "react"
import "./Shop.scss"


export default function Shop() {
    const { shopCategories } = useContext(CategoryContext);
    return (
        <div className="shop-container">
            {shopCategories
                .map(({ title, items }) => (
                    <CategoryPreview key={title} title={title} products={items} />
                    // <Fragment key={title}>
                    //     <h2>{title}</h2>
                    //     <div className='product-container'>
                    //         {items.map((product) => (
                    //             <ProductCard key={product.id} product={product} />
                    //         ))}
                    //     </div>
                    // </Fragment>
                ))}
        </div>
    )
}

