import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Shop from './pages/Shop';
import BaseLayout from './layouts/BaseLayout/BaseLayout';
import { Authentication } from './pages/Authentication';
import Checkout from './pages/Checkout/Checkout';
import CategoryPreview from './pages/Shop/components/CategoryPreview';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="shop">
          <Route index element={<Shop />} />
          <Route path=":category" element={<CategoryPreview />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
