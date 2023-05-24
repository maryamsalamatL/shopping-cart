const addOneProductToCart = (state, payload) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === payload._id
  );
  if (updatedItemIndex < 0) {
    updatedCart.push({ ...payload, quantity: 1 });
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
  //   const index = state.cart.findIndex((p) => p._id === payload._id);
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
const addMultipleProductToCart = (state, { payload, qty }) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === payload._id
  );
  if (updatedItemIndex < 0) {
    updatedCart.push({ ...payload, quantity: qty });
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity = qty;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};
const incrementProductQuantity = (state, payload) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === payload._id
  );
  const updatedItem = { ...updatedCart[updatedItemIndex] };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    const filteredCart = updatedCart.filter(
      (item) => item._id !== updatedItem._id
    );
    return { ...state, cart: filteredCart };
  }
  updatedCart[updatedItemIndex] = updatedItem;
  return { ...state, cart: updatedCart };
};
const removeProductFromCart = (state, payload) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === payload._id
  );
  const updatedItem = { ...updatedCart[updatedItemIndex] };
  updatedItem.quantity = 0;
  const filteredCart = updatedCart.filter(
    (item) => item._id !== updatedItem._id
  );
  return { ...state, cart: filteredCart };
};
const totalPriceCalculator = (state) => {
  const totalPrice = state.cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  return { ...state, total: totalPrice };
};
const clearCart = (state) => {
  return state({ ...state, cart: [] });
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ONE_TO_CART":
      return addOneProductToCart(state, action.payload);
    case "MULTIPLE_ADD_TO_CART":
      return addMultipleProductToCart(state, action);
    case "INCREMENT_PRODUCT":
      return incrementProductQuantity(state, action.payload);
    case "REMOVE_PRODUCT":
      return removeProductFromCart(state, action.payload);
    case "TOTAL_PRICE":
      return totalPriceCalculator(state);
    case "CLEAR_CART":
      return clearCart(state);
    default:
      return state;
  }
};
export default cartReducer;
