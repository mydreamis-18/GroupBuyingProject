import { FlexDiv, Title, AddProductImg } from "../styledComponent";
import { addProduct_action } from "../redux/middleware";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DatePicker } from "../component";
//
const AddProduct = () => {
  //
  const dispatch = useDispatch();
  const newProduct = useRef([]);
  newProduct.current = {};
  //
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  //
  // ㅜ 사진 선택 시 이미지 미리보기 기능을 위해 리렌더링 유도
  const [img, setImg] = useState("");
  //
  // ㅜ state 값 초기화하기
  useEffect(() => {
    //
    if (img !== "") setImg("");
    //
    setStartDate(new Date());
    setEndDate(startDate);
  }, []);
  //
  return (
    <FlexDiv>
      <Title>상품 등록</Title>
      <label>상품명 </label>
      <input ref={(el) => (newProduct.current.name = el)} />
      <br />
      <label>상품 이미지 </label>
      <input onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" style={{ transform: "translateX(2vw)" }} />
      <br />
      <AddProductImg src={img ? URL.createObjectURL(img) : <></>} alt="" />
      <br />
      <label>상품 설명 </label>
      <input ref={(el) => (newProduct.current.content = el)} />
      <br />
      <label>재고 수량 </label>
      <input ref={(el) => (newProduct.current.stock_count = el)} type="number" min={"0"} />
      <br />
      <label>즉시 구매가 </label>
      <input ref={(el) => (newProduct.current.price = el)} type="number" step={"1000"} min={"0"} />
      <br />
      <label>공동 구매가 </label>
      <input ref={(el) => (newProduct.current.discount_price = el)} type="number" step={"1000"} min={"0"} />
      <br />
      <DatePicker stateArr={[startDate, setStartDate, endDate, setEndDate]} />
      <br />
      <button onClick={addProductBtn}>상품 등록하기</button>
      <br />
    </FlexDiv>
  );
  function addProductBtn() {
    //
    let isNull = false;
    //
    // ㅜ isNull 유효성 체크
    for (const key in newProduct.current) {
      //
      if (newProduct.current[key].value === "") {
        //
        isNull = true;
        break;
      }
    }
    if (isNull) {
      //
      alert("빈 값이 있으면 등록이 불가합니다.\n(혹은 숫자로 올바르게 입력했는지 확인해주세요.)");
      return;
    }
    //
    // ㅜ 태그가 담긴 ref 객체 그대로를 백엔드로 보내면 에러 발생함 주의
    // for (const key in product.current) {
    //   //
    //   product.current[key] = product.current[key].value;
    // }
    //
    const formData = new FormData();
    //
    for (const key in newProduct.current) {
      //
      formData.append(key, newProduct.current[key].value);
    }
    formData.append("img_path", "/tmp/uploads/" + img.name);
    formData.append("start_date", startDate.toString());
    formData.append("end_date", endDate.toString());
    formData.append("img", img);
    URL.revokeObjectURL(img);
    //
    dispatch(addProduct_action(formData));
  }
};
export default AddProduct;
