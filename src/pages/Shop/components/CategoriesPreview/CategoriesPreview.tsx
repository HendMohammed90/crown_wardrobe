import "./categoriesPreview.scss"
import ProductCard from "../../../../shared/Components/ProductCard/ProductCard"
import { Item } from "@/utils/types";
import { Link } from "@mongez/react-router";

interface CategoryPreviewProps {
    title: string;
    products: Array<Item>;
}

export default function CategoriesPreview({ title, products }: CategoryPreviewProps) {
    return (
        <div className='category-preview-container'>
            <Link className="nav-link" to={`/shop/category:${encodeURIComponent(title)}`}>
                <span className='title'>{title.toUpperCase()}</span>
            </Link>
            <div className='preview'>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>)
}
