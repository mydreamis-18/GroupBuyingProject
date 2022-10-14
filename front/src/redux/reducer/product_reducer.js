const init = {
  //
  products: new Array(0),
  productsCurrentIdx: "",
  isDefaultImg: true,
  productsLength: 0,
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  const { products } = state;
  switch (type) {
    //
    case "GET_ALL_PRODUCTS":
      return { ...state, products: payload };
    //
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    //
    case "DELETE_PRODUCT":
      return { ...state, products: payload };
    //
    case "GET_PRODUCTS_LENGTH":
      const productsLength = products.length;
      return { ...state, productsLength };
    //
    case "PLUS_PRODUCTS_CURRENT_IDX":
      //
      let plus = products.productsCurrentIdx++;
      //
      const isLast = plus >= products.productsLength;
      if (isLast) plus = 0;
      //
      return { ...state, productsCurrentIdx: plus };
    //
    case "MINUS_PRODUCTS_CURRENT_IDX":
      //
      let minus = products.productsCurrentIdx--;
      //
      const isFirst = minus < 0;
      if (isFirst) minus = state.productsLength - 1;
      //
      return { ...state, productsCurrentIdx: minus };
    //
    case "":
      return { ...state, products: payload };
    //
    default:
      return state;
  }
}
export default reducer;
