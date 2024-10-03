import CategoryItem from '../CategoryItem/CategoryItem';
import { category } from '../../../../utils/types';
import './Category.scss';

type DirectoryPropType = {
    categories: category[]
}

const Category = ({ categories }: DirectoryPropType) => {
    return (
        <div className='directory-container'>
            {categories.map((category: category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    )
}

export default Category