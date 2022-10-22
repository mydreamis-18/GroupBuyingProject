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
