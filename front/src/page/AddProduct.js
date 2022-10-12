import { FlexDiv, Title, AddProductImg } from "../styledComponent";
import { addProduct_action } from "../redux/middleware";
import { useDispatch } from "react-redux";
import { DatePicker } from "../component";
import { useState, useRef } from "react";
//
const AddProduct = () => {
  //
  const dispatch = useDispatch();
  const product = useRef([]);
  product.current = {};
  //
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  //
  // ㅜ 사진 선택 시 이미지 미리보기 기능을 위해 리렌더링 유도
  const [img, setImg] = useState("");
  //
  return (
    <FlexDiv>
      <Title>상품 등록</Title>
      <label>상품명 </label>
      <input ref={(el) => (product.current.name = el)} />
      <br />
      <label>상품 이미지 </label>
      <input ref={(el) => (product.current.img = el)} onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" style={{ transform: "translateX(2vw)" }} />
      <br />
      <AddProductImg src={img ? URL.createObjectURL(img) : <></>} alt="" />
      <br />
      <label>상품 설명 </label>
      <input ref={(el) => (product.current.content = el)} />
      <br />
      <label>재고 수량 </label>
      <input ref={(el) => (product.current.stock_count = el)} type="number" min={"0"} />
      <br />
      <label>즉시 구매가 </label>
      <input ref={(el) => (product.current.price = el)} type="number" step={"1000"} min={"0"} />
      <br />
      <label>공동 구매가 </label>
      <input ref={(el) => (product.current.discount_price = el)} type="number" step={"1000"} min={"0"} />
      <br />
      <DatePicker stateArr={[startDate, setStartDate, endDate, setEndDate]} />
      <br />
      <button onClick={addProduct}>상품 등록하기</button>
      <br />
    </FlexDiv>
  );
  function addProduct() {
    //
    let isNull = false;
    //
    // ㅜ isNull 유효성 체크
    for (const key in product.current) {
      //
      if (Object.hasOwnProperty.call(product.current, key)) {
        //
        if (product.current[key].value === "") {
          //
          isNull = true;
          break;
        }
      }
    }
    if (isNull) {
      //
      alert("빈 값이 있으면 등록이 불가합니다.\n(혹은 숫자로 올바르게 입력했는지 확인해주세요.)");
      return;
    }
    // ㅜ ref 객체 그대로를 백엔드로 보내면 에러 발생함 주의
    for (const key in product.current) {
      //
      if (Object.hasOwnProperty.call(product.current, key)) {
        //
        product.current[key] = product.current[key].value;
      }
    }
    // console.log(product.current.img); // C:\fakepath\서현진 배우님.jpeg
    product.current.img = img;
    URL.revokeObjectURL(img);
    setImg("");
    //
    // ㅜ 판매 시작 및 종료 시간을 타임스탬프로 저장
    product.current.end_date = endDate.getTime();
    product.current.start_date = startDate.getTime();
    //
    dispatch(addProduct_action.addProduct(product.current));
  }
};
export default AddProduct;
