import axios from "axios";
//
function getProduct(product_id) {
  //
  return async (_dispatch, getState) => {
    //
    const _getProduct = await axios({
      //
      url: `http://localhost:8000/getProduct/${product_id}`,
      method: "get",
    });
    console.log(_getProduct.data);
    _dispatch({ type: "getProduct", payload: _getProduct.data.img });
  };
}
// ㅜ 변수에 담으면 여러 개의 변수를 내보낼 수 있는 지 확인해보자!
export const getProduct_action = { getProduct };
