import axios from "axios";
//
////////////////////////////////////////////////////
export const buy_action = (type, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const RATE = 0.1;
    const { products, productsIdx } = getState().product_reducer;
    const { access_token, refresh_token } = sessionStorage;
    const { id, name, price } = products[productsIdx];
    let points = getState().user_reducer.points;
    points += price * RATE;
    const _buy_action = await axios({
      //
      data: { type, id, points, access_token, refresh_token },
      url: "http://localhost:8000/buy",
      method: "post",
    });
    const { isSuccess, alertMsg, newAccessToken, newTransition } = _buy_action.data;
    if (isSuccess) {
      //
      const Product = { id, name, price, type };
      _dispatch({ type: "UPDATE_POINTS", payload: points });
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
      _dispatch({ type: "ADD_TRANSACTION", payload: { ...newTransition, Product } });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  };
};
//
/////////////////////////////////////////////////////////////
export const refund_action = (type, productNum, price, created_at, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const RATE = 0.1;
    let points = getState().user_reducer.points;
    points -= price * RATE;
    //
    const { access_token, refresh_token } = sessionStorage;
    const _refund_action = await axios({
      //
      data: { type, productNum, created_at, points, access_token, refresh_token },
      url: "http://localhost:8000/refund",
      method: "post",
    });
    const { isSuccess, alertMsg, newAccessToken, updated_at } = _refund_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "REFUND", payload: { type, productNum, created_at, updated_at } });
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
      _dispatch({ type: "UPDATE_POINTS", payload: points });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
    //
    alert(alertMsg);
  };
};
