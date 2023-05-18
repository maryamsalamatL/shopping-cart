import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import HomePage from "./pages/homePage/HomePage";
import CartPage from "./pages/cartPage/CartPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
