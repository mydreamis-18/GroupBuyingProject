import axios from "axios";
//
function addProduct(productValues) {
  //
  return async (_dispatch, getState) => {
    //
    const _addProduct = await axios({
      //
      url: "http://localhost:8000/addProduct",
      method: "post",
      data: { productValues },
    });
    console.log(_addProduct);
    alert(_addProduct.data);
  };
}
// ㅜ 변수에 담으면 여러 개의 변수를 내보낼 수 있는 지 확인해보자!
export const addProduct_action = { addProduct };
