import axios from "axios";
//
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
    _dispatch({ type: "GET_ALL_PRODUCTS", payload: _getAllProducts_action.data });
  };
};
//
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
    _dispatch({ type: "ADD_PRODUCTS", payload: _addProduct_action.data });
    //
    alert(_addProduct_action.data);
  };
};
//
export const deleteProduct_action = (product_id) => {
  //
  return async (_dispatch, getState) => {
    //
    const _deleteProduct_action = await axios({
      url: `http://localhost:8000/deleteProduct/${product_id}`,
      method: "post",
    });
    console.log(_deleteProduct_action.data);
    _dispatch({ type: "DELETE_PRODUCT", payload: _deleteProduct_action.data });
  };
};
