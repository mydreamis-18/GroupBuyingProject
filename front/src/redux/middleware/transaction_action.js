import { forVerifyTokensFn, ReLoginFn, saveNewAccessTokenFn } from "../../function";
import axios from "axios";
//
export const buy_action = (path, toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const { products, productsIdx } = getState().product_reducer;
    const product_id_fk = products[productsIdx].id;
    const _buy_action = await axios({
      //
      data: { product_id_fk, ...forVerifyTokensFn(getState) },
      url: `http://localhost:8000/${path}`,
      method: "post",
    });
    const { isSuccess, alertMsg } = _buy_action.data;
    //
    const logoutActionFn = () => _dispatch({ type: "LOGOUT" });
    saveNewAccessTokenFn(_buy_action.data.access_token);
    ReLoginFn(isSuccess, logoutActionFn, toLoginPageFn);
    alert(alertMsg);
  };
};
