import "./categoriesPreview.scss"
import ProductCard from "../../../../shared/Components/ProductCard/ProductCard"
import { Item } from "@/utils/types";
import { Link } from "react-router-dom";

interface CategoryPreviewProps {
    title: string;
    products: Array<Item>;
}

export default function CategoriesPreview({ title, products }: CategoryPreviewProps) {
    return (
        <div className='category-preview-container'>
            <Link className="nav-link" to={`/shop/${encodeURIComponent(title)}`}>
                <span className='title'>{`{${title.toUpperCase()}}`}</span>
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
