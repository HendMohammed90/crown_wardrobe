import ProductCard from "../../shared/Components/ProductCard/ProductCard"
import { CategoryContext } from "../../shared/contexts/CategoryContext"
import { useContext, Fragment } from "react"
import "./Shop.scss"

interface ShopProps {
    params: {
        title: string; // Define the type for title within params
    };}

export default function Shop({ params }: ShopProps) {
    const { shopCategories } = useContext(CategoryContext);
    console.log(shopCategories)
    const urlTitle = params.title ? params.title.split('=')[1] : '';
    console.log(urlTitle)
    return (
        <Fragment>
            {shopCategories
                .filter(({ title }) => title === title) // Filter categories by selectedTitle
                .map(({ title, items }) => ( // Updated to destructure title and items
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className='product-container'>
                            {items.map((product) => ( // Changed to map over items
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </Fragment>
                ))}
        </Fragment>
    )
}

