import axios from "axios";
//
function addProduct(productValues) {
  //
  // console.log("ok", product) // useRef() 함수 객체의 그 자체를 백엔드로 보내면 에러가 발생함
  return async (_dispatch, getState) => {
    //
    const newProduct = await axios({
      //
      url: "http://localhost:8000/addProduct",
      method: "post",
      data: { productValues },
    });
    // console.log(newProduct);
    // if (newProduct.data) {
    //   //
    //   alert("상품 등록이 정상적으로 완료되었습니다.");
    //   return;
    // }
    // alert("상품 등록에 실패하였습니다.");
  };
}
// ㅜ 변수에 담으면 여러 개의 변수를 내보낼 수 있는 지 확인해보자!
export const addProduct_action = { addProduct };
