import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { AuthPage } from './modules/AuthPage';
import { ProfilePage } from './modules/ProfilePage';
import { ProtectedRoute } from './ProtectedRoute';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="wines">
        <Route index element={<ProductsPage />} />
        <Route path=":itemId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="auth" element={<AuthPage />} />

      <Route
        path="account"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
