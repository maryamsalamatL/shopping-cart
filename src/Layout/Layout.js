import Navigation from "../components/navigation/Navigation";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
