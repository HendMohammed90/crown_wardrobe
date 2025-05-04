import CategoryItem from '../CategoryItem/CategoryItem';
import { CategoryType } from '../../../../utils/types';
import './Category.scss';

const categoryImages = [
    { imageUrl: 'https://i.ibb.co/cvpntL1/hats.png' },
    { imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png' },
    { imageUrl: 'https://i.ibb.co/R70vBrQ/men.png' },
    { imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png' },
    { imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png' },
];

type CategoryPropType = {
    categories: CategoryType[]
}

const Category = ({ categories }: CategoryPropType) => {
    return (
        <div className='directory-container'>
            {categories.map((category, index) => (
                <CategoryItem 
                    key={category.title} 
                    items={category.items} 
                    title={category.title}
                    imageUrl={categoryImages[index].imageUrl}
                />
            ))}
        </div>
    )
}

export default Category