import CategoryItem from '../CategoryItem/CategoryItem';
import { Category } from '../../utils/types';
import './directory.scss';

type DirectoryPropType = {
    categories: Category[]
}

const Directory = ({ categories }: DirectoryPropType) => {
    return (
        <div className='directory-container'>
            {categories.map((category: Category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    )
}

export default Directory