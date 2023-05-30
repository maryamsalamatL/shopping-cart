import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <section style={{ padding: "2.5rem" }}>
      <h1>ERROR 404 ; NOT FOUND</h1>
      <Link to={-1}>
        <h4>click to go back</h4>
      </Link>
    </section>
  );
};

export default NotFoundPage;
