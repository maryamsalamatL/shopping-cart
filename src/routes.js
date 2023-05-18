import HomePage from "./pages/homePage/HomePage";
import CartPage from "./pages/cartPage/CartPage";
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/cart", element: <CartPage /> },
];
export default routes;
