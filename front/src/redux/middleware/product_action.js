import axios from "axios";
//
/////////////////////////////////////////////////////////////
// ㅜ 변수에 담으면 여러 개의 변수를 내보낼 수 있는 지 확인해보자!
export const getAllProducts_action = () => {
  //
  return async (_dispatch, getState) => {
    //
    const _getAllProducts_action = await axios({
      //
      url: "http://localhost:8000/getAllProducts",
      method: "post",
    });
    const products = _getAllProducts_action.data;
    //
    // if (products.length === 0) return;
    //
    await _dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
    // console.log("2");
    //
    setTimeout(() => _dispatch({ type: "LOADINGPAGE_OFF" }), 2000);
  };
};
//
////////////////////////////////////////////////
export const addProduct_action = (formData) => {
  //
  return async (_dispatch, getState) => {
    //
    const _addProduct_action = await axios({
      //
      url: "http://localhost:8000/addProduct/formData",
      method: "post",
      data: formData,
    });
    const { isSuccess, alertMsg, newProduct } = _addProduct_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    }
    alert(alertMsg);
  };
};
//
/////////////////////////////////////////////////////
export const deleteProduct_action = (product_id) => {
  //
  return async (_dispatch, getState) => {
    //
    const _deleteProduct_action = await axios({
      url: `http://localhost:8000/deleteProduct/${product_id}`,
      method: "post",
    });
    console.log(_deleteProduct_action.data);
    //
    _dispatch({ type: "DELETE_PRODUCT", payload: _deleteProduct_action.data });
  };
};
