// import { category } from "../../utils/types";
import Category from "./components/Category/Category";
import { CategoryContext } from "../../shared/contexts/CategoryContext"
import { useContext } from "react"

const HomePage = () => {

    // const categories: category[] = [
    //     {
    //         id: 1,
    //         title: 'hats',
    //         imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    //     },
    //     {
    //         id: 2,
    //         title: 'jackets',
    //         imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    //     },
    //     {
    //         id: 3,
    //         title: 'sneakers',
    //         imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    //     },
    //     {
    //         id: 4,
    //         title: 'womens',
    //         imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    //     },
    //     {
    //         id: 5,
    //         title: 'mens',
    //         imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    //     },
    // ];

    const { shopCategories } = useContext(CategoryContext);

    return <Category categories={shopCategories} />;  // Pass array of categories
}

export default HomePage;


