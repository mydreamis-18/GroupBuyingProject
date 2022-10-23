import axios from "axios";
//
////////////////////////////////////////////////////
export const buy_action = (path, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const { products, productsIdx } = getState().product_reducer;
    const { access_token, refresh_token } = sessionStorage;
    const product_id_fk = products[productsIdx].id;
    const _buy_action = await axios({
      //
      data: { product_id_fk, access_token, refresh_token },
      url: `http://localhost:8000/${path}`,
      method: "post",
    });
    const { isSuccess, alertMsg, newAccessToken } = _buy_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  };
};
//
/////////////////////////////////////////////////////////////
export const refund_action = (type, productNum, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const { access_token, refresh_token } = sessionStorage;
    const _refund_action = await axios({
      //
      data: { type, productNum, access_token, refresh_token },
      url: "http://localhost:8000/refund",
      method: "post",
    })
    console.log(_refund_action.data)
    const { isSuccess, alertMsg, newAccessToken } = _refund_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
      _dispatch({ type: "REFUND", payload: productName });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  }
}
//
//////////////////////////////////////////////////
export const myPage_action = (toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    _dispatch({ type: "VERIFYING_ON" });
    //
    const { access_token, refresh_token } = sessionStorage;
    const _myPage_action = await axios({
      //
      data: { access_token, refresh_token },
      url: "http://localhost:8000/myPage",
      method: "post",
    });
    const { isSuccess, alertMsg, newAccessToken, buyNowTransactions, buyTogetherTransactions } = _myPage_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "ADD_TRANSACTIONS", payload: { buyNowTransactions, buyTogetherTransactions } });
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    _dispatch({ type: "VERIFYING_OFF" });
    //
    alert(alertMsg);
  };
};
