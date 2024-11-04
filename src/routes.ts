import HomePage from "./pages/HomePage/HomePage";
// import Shop from "./pages/Shop";
import BaseLayout from "./layouts/BaseLayout/BaseLayout";
import router from "@mongez/react-router";
import Shop from "./pages/Shop";
import { Authentication } from "./pages/Authentication";




// router.add("/", HomePage);
// router.add("/shop" , Shop);
router.partOf(BaseLayout, [
        {
            path: "/",
            component: HomePage,
        },
        {
            path: "/shop",
            component: Shop,
        },
        {
            path: "/auth",
            component: Authentication,
        },
    ])