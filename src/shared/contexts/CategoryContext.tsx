import React, { useEffect } from "react";
import { createContext, useState } from "react";
// import SHOP_DATA from "../../utils/shop-data";
// import { ShopProduct } from "@/shared/types/product"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CategoryType } from "../../utils/types"

export const CategoryContext = createContext<{
    shopCategories: CategoryType[];
    setShopCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}>({
    shopCategories: [],
    setShopCategories: () => { }
});

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
    const [shopCategories, setShopCategories] = useState<CategoryType[]>([]);

    const result = async () => {
        const categoryMap = await getCategoriesAndDocuments()
        return categoryMap
    }

    useEffect(() => {
        // addCollectionAndDocuments('Documents', SHOP_DATA);
        result().then((categoryMap) => {
            const categoriesArray = Object.keys(categoryMap).map(title => ({
                title,
                items: categoryMap[title]
            })) as CategoryType[];
            setShopCategories(categoriesArray);
        });
    }, []);

    const value = { shopCategories, setShopCategories };

    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}


// const { shopCategories } = useContext(CategoryContext);
// console.log(`shopCategories are ${JSON.stringify(shopCategories)}`);
// const title = params.title ? params.title.split('=')[1] : '';

// const filteredCategory = shopCategories.find(category => category.title === title);

// if (!filteredCategory) {
//     return <div>No products found for this category.</div>; // Handle case where category is not found
// }

// return (
//     <Fragment>
//         {Object.keys(shopCategories).map((title) => (
//             <Fragment key={title}>
//                 <h2>{title}</h2>
//                 <div className='products-container'>
//                     {filteredCategory.items.map((product: Item) => (  // Use the correct type for product
//         <ProductCard key={product.id} product={product} />
//     ))}
//                 </div>
//             </Fragment>
//         ))}
//     </Fragment>
// )