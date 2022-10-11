import { addProduct_action } from "../redux/middleware";
import { FlexTemp, Title } from "../styledComponent";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
//
const AddProduct = () => {
  //
  const product = useRef([]);
  const dispatch = useDispatch();
  //
  // console.log(product.current?.value); // 초기 값을 배열로 선언하지 않을 경우에 초기 값 undefined (물음표 필수)
  // console.log(product.current.value); // 초기 값을 배열로 선언할 경우에 초기 값 undefined (물음표 필요 없음)
  //
  return (
    <FlexTemp>
      <Title>상품 등록</Title>
      <label>상품명 </label>
      <input ref={(el) => (product.current[0] = el)} />
      <br />
      <label>이미지... (파일 업로드 기능 한 번도 안 해봤는데...) </label>
      <input ref={(el) => (product.current[1] = el)} />
      <br />
      <label>설명 </label>
      <input ref={(el) => (product.current[2] = el)} />
      <br />
      <label>재고 수량 </label>
      <input ref={(el) => (product.current[3] = el)} />
      <br />
      <label>즉시 구매가 </label>
      <input ref={(el) => (product.current[4] = el)} />
      <br />
      <label>공동 구매가 </label>
      <input ref={(el) => (product.current[5] = el)} />
      <br />
      <label>판매 시작 시간 </label>
      <input ref={(el) => (product.current[6] = el)} />
      <br />
      <label>판매 종료 시간 </label>
      <input ref={(el) => (product.current[7] = el)} />
      <br />
      <button onClick={addProduct}>상품 등록하기</button>
      <br />
    </FlexTemp>
  );
  function addProduct() {
    //
    product.current.forEach((el) => {
      console.log(el.value);
    });
    dispatch(addProduct_action.addProduct(product));
    // console.log(product.current.value); // 초기 값을 배열로 선언하지 않을 경우에 초기 값 "" (물음표 필요 없음)
  }
};
export default AddProduct;
