import HomePage from "./pages/homePage/HomePage";
import CartPage from "./pages/cartPage/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ProductPage from "./pages/product/ProductPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/profile", element: <UserProfilePage /> },
  { path: "*", element: <NotFoundPage /> },
];
export default routes;
