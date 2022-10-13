import { FlexDiv, Title, AddProductImg } from "../styledComponent";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DatePicker } from "../component";
import axios from "axios";
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
      <input ref={(el) => (product.current.name = el)} />
      <br />
      <label>상품 이미지 </label>
      <input onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" style={{ transform: "translateX(2vw)" }} />
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
      <button onClick={addProductBtn}>상품 등록하기</button>
      <br />
    </FlexDiv>
  );
  function addProductBtn() {
    //
    console.log(product.current);
    //
    let isNull = false;
    //
    // ㅜ isNull 유효성 체크
    for (const key in product.current) {
      //
      if (product.current[key].value === "") {
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
    for (const key in product.current) {
      //
      formData.append(key, product.current[key].value);
    }
    formData.append("img_path", "/tmp/uploads/" + img.name);
    formData.append("start_date", startDate.toString());
    formData.append("end_date", endDate.toString());
    formData.append("img", img);
    URL.revokeObjectURL(img);
    //
    console.log(typeof formData);
    addProduct(formData);
  }
  /////////////////////////////////////////////////////////////////
  /**
   * 입력한 상품 정보를 DB에 저장하기 위해 axios 통신하는 함수 10.13.20
   * @param {object} formData
   */
  async function addProduct(formData) {
    //
    const _addProduct = await axios({
      //
      url: "http://localhost:8000/addProduct/new",
      method: "post",
      data: formData,
    });
    alert(_addProduct.data);
  }
};
export default AddProduct;
