export const checkInCart = (cart, product) => {
  return cart.find((item) => item._id === product._id);
};
