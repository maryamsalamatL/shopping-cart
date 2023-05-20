const addProductToCart = (state, payload) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === payload.id
  );
  if (updatedItemIndex < 0) {
    updatedCart.push({ ...payload, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
  //   const index = state.cart.findIndex((p) => p.id === payload.id);
  //   //   console.log(index);
  //   if (index > -1) {
  //     const product = { ...state.cart[index] };
  //     product.quantity++;
  //     const updatedCart = [...state.cart];
  //     updatedCart[index] = product;
  //     return { ...state, cart: updatedCart };
  //   }
  //   return {
  //     ...state,
  //     cart: [...state.cart, { ...payload, quantity: 1 }],
  //   };
};
const removeProductFromCart = (state, payload) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === payload.id
  );
  const updatedItem = { ...updatedCart[updatedItemIndex] };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    const filteredCart = updatedCart.filter(
      (item) => item.id !== updatedItem.id
    );
    return { ...state, cart: filteredCart };
  }
  updatedCart[updatedItemIndex] = updatedItem;
  return { ...state, cart: updatedCart };
};
const totalPriceCalculator = (state) => {
  const totalPrice = state.cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  return { ...state, total: totalPrice };
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addProductToCart(state, action.payload);

    case "REMOVE_PRODUCT":
      return removeProductFromCart(state, action.payload);

    case "TOTAL_PRICE":
      return totalPriceCalculator(state);
    default:
      return state;
  }
};
export default cartReducer;
