const init = {
  //
  products: new Array(0),
  isDoneLoading: false,
  isDefaultImg: true,
  productsLength: 0,
  productsIdx: 0,
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  switch (type) {
    //
    case "GET_ALL_PRODUCTS":
      return { ...state, products: payload, productsLength: payload.length, isDoneLoading: true };
    //
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    //
    case "DELETE_PRODUCT":
      return { ...state, products: payload };
    //
    case "GET_PRODUCTS_LENGTH":
      const productsLength = state.products.length;
      return { ...state, productsLength };
    //
    case "PLUS_PRODUCTS_IDX":
      //
      let plus = state.productsIdx + 1;
      //
      const isLast = plus >= state.productsLength;
      if (isLast) plus = 0;
      //
      return { ...state, productsIdx: plus };
    //
    case "MINUS_PRODUCTS_IDX":
      //
      let minus = state.productsIdx - 1;
      //
      const isFirst = minus < 0;
      if (isFirst) minus = state.productsLength - 1;
      //
      return { ...state, productsIdx: minus };
    //
    case "":
      return { ...state, products: payload };
    //
    default:
      return state;
  }
}
export default reducer;
