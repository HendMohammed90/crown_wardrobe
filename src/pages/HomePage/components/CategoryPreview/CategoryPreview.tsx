import "./category-preview.scss"
import ProductCard from "../../../../shared/Components/ProductCard/ProductCard"
import { Item } from "@/utils/types";

interface CategoryPreviewProps {
    title: string;
    products: Array<Item>;
}

export default function CategoryPreview({ title, products }:CategoryPreviewProps) {
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>)
}
