const init = {
  //
  transactions: new Array(0),
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  const { transactions } = state;
  let _transactions = null;
  //
  switch (type) {
    //
    ////////////////////////
    case "ADD_TRANSACTIONS":
      //
      const { buyNowTransactions, buyTogetherTransactions } = payload;
      if (buyNowTransactions.length === 0 && buyTogetherTransactions.length === 0) {
      }
      //
      else if (buyNowTransactions.length === 0) {
        //
        state.transactions = buyTogetherTransactions;
      }
      //
      else if (buyTogetherTransactions.length === 0) {
        //
        state.transactions = buyNowTransactions;
      }
      //
      else {
        _transactions = buyNowTransactions.concat(buyTogetherTransactions);
        _transactions.sort((a, b) => {
          //
          if (a.created_at > b.created_at) return 1;
          else if (a.created_at < b.created_at) return -1;
          return 0;
        });
        state.transactions = _transactions;
      }
      return state;
    //
    //////////////////////
    case "ADD_TRANSACTION":
      return { ...state, transactions: [...transactions, payload] };
    //
    /////////////
    case "REFUND":
      _transactions = transactions.map((el) => {
        //
        const isTransition = el.Product.type === payload.type && el.Product.id === payload.productNum && el.created_at === payload.created_at;
        if (isTransition) {
          //
          return { ...el, is_refund: true, updated_at: payload.updated_at };
        }
        return el;
      });
      return { ...state, transactions: _transactions };
    //
    case "":
      return state;
    //
    default:
      return state;
  }
}
export default reducer;
