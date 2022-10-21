const init = {
  //
  products: new Array(0),
  isLoadingPage: false,
  isDefaultImg: true,
  productsLength: 0,
  productsIdx: 0,
  isOver: false,
  temp: "temp",
};
function reducer(state = init, action) {
  //
  const { products, isDoneLoading, isDefaultImg, productsLength, productsIdx } = state;
  const { type, payload } = action;
  let newIdx = null;
  switch (type) {
    //
    case "GET_ALL_PRODUCTS":
      return { ...state, products: payload, productsLength: payload.length, isOver: true };
    //
    case "LOADINGPAGE_OFF":
      return { ...state, isLoadingPage: true };
    //
    case "ADD_PRODUCT":
      return { ...state, products: [...products, payload], productsLength: productsLength + 1 };
    //
    case "DELETE_PRODUCT":
      return { ...state, products: payload };
    //
    case "PLUS_PRODUCTS_IDX":
      //
      newIdx = productsIdx + 1;
      //
      const isLast = newIdx >= productsLength;
      if (isLast) newIdx = 0;
      //
      return { ...state, productsIdx: newIdx };
    //
    case "MINUS_PRODUCTS_IDX":
      //
      newIdx = productsIdx - 1;
      //
      const isFirst = newIdx < 0;
      if (isFirst) newIdx = productsLength - 1;
      //
      return { ...state, productsIdx: newIdx };
    //
    case "":
      return { ...state, products: payload };
    //
    default:
      return state;
  }
}
export default reducer;
