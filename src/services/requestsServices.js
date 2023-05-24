import http from "./httpService";

const getProducts = () => {
  return http.get("/product");
};
const getOneProduct = (id) => {
  return http.get(`/product/${id}`);
};
const signupUser = (user) => {
  return http.post("/user/register", user);
};
const loginUser = (user) => {
  return http.post("/user/login", user);
};

export { signupUser, getOneProduct, getProducts, loginUser };
