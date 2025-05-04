import HomePage from "./pages/HomePage/HomePage";
// import Shop from "./pages/Shop";
import BaseLayout from "./layouts/BaseLayout/BaseLayout";
import router from "@mongez/react-router";
import Shop from "./pages/Shop";
import { Authentication } from "./pages/Authentication";
import Checkout from "./pages/Checkout/Checkout";
import CategoryPreview from "./pages/Shop/components/CategoryPreview";




// router.add("/", HomePage);
// router.add("/shop" , Shop);
router.partOf(BaseLayout, [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/auth",
        component: Authentication,
    },
    {
        path: "/checkout",
        component: Checkout,
    },
])

router.group({
    path: "/shop",
    layout: BaseLayout,
    routes: [
        {
            path: "/",
            component: Shop,
        },
        {
            path: "/:category",
            component: CategoryPreview,
        },
    ]
})