import { Link } from "@mongez/react-router";
import { Item } from "../../../../utils/types";

import "./CategoryItem.scss"

type CategoryItemPropType = {
    items: Item[],
    title: string,
    imageUrl: string
}

const CategoryItem = ({ title, imageUrl }: CategoryItemPropType) => {
    return (
        <div className='category-container'>
            <div
                className='background-image'
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className='category-body-container'>
                <h2>{title}</h2>
                <Link className="nav-link" to={`/shop/category:${encodeURIComponent(title)}`}>
                    Shop Now
                </Link>
            </div>
        </div>
    );
}

export default CategoryItem