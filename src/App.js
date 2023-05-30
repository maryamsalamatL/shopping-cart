import "./App.css";
import CartProvider from "./provider/CartProvider";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import AuthProvider from "./provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
