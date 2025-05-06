import { Item } from '@/utils/types';
import ProductCard from "../../../../shared/Components/ProductCard/ProductCard"
import { useContext, useState, useEffect } from 'react';
import { CategoryContext } from '../../../../shared/contexts/CategoryContext';
import { useParams } from 'react-router-dom';

export default function CategoryPreview() {
    const { category } = useParams<{ category: string }>();
    const urlTitle = category;
    const [title, setTitle] = useState("");
    const [products, setProducts] = useState<Item[]>([]);
    const { shopCategories } = useContext(CategoryContext);
    // console.log(JSON.stringify(shopCategories))

    useEffect(() => {
        setTitle(urlTitle);
        const filteredProducts = shopCategories.find(category => category.title === urlTitle)?.items || [];
        // console.log(`filteredProducts ${JSON.stringify(filteredProducts)}`);
        setProducts(filteredProducts);
    }, [urlTitle, shopCategories]);

    return (
        <div className='category-preview-container'>
            <h2>{title}</h2>
            <div className='preview'>
                {products
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
};
