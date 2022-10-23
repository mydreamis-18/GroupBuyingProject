const init = {
  //
  userNum: null,
  isLogin: false,
  isVerifying: false,
  transactions: new Array(0)
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  switch (type) {
    //
    case "LOGIN":
      return { ...state, isLogin: true, userNum: payload };
    //
    case "LOGOUT":
      const moveToPageFn = payload;
      //
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      console.log(sessionStorage);
      alert("로그아웃되었습니다.");
      moveToPageFn();
      //
      return { ...state, isLogin: false, isVerifying: false, transaction: new Array(0) };
    //
    case "VERIFYING_ON":
      return { ...state, isVerifying: true };
    //
    case "VERIFYING_OFF":
      return { ...state, isVerifying: false };
    //
    case "IS_NEW_ACCESS_TOKEN":
      if (payload !== undefined) {
        //
        sessionStorage.setItem("access_token", payload);
      }
      return state;
    //
    case "ADD_TRANSACTIONS":
      let { buyNowTransactions, buyTogetherTransactions } = payload;
      buyNowTransactions = buyNowTransactions.map((el) => ({ ...el, Product: { ...el.Product, type: "바로 구매" } }));
      buyTogetherTransactions = buyTogetherTransactions.map((el) => ({ ...el, Product: { ...el.Product, type: "공동 구매" } }));
      //
      let _transactions = buyNowTransactions.concat(buyTogetherTransactions);
      _transactions.sort((a, b) => {
        if (a.created_at > b.created_at) return 1;
        else if (a.created_at < b.created_at) return -1;
        return 0;
      })
      return { ...state, transactions: _transactions };
    //
    default:
      return state;
  }
}
export default reducer;
