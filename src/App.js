import "./App.css";
import CartProvider from "./provider/CartProvider";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import HomePage from "./pages/homePage/HomePage";
import CartPage from "./pages/cartPage/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CartProvider>
      <Layout>
        <ToastContainer />
        <Routes>
          {routes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
