import { ColumnFlexDiv, Title, AddProductImg } from "../styledComponent";
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
  // ㅜ onChange = { inputsHandlerFn };
  // const inputsHandlerFn = (e) => {
  //   //
  //   const { name, value } = e.target;
  //   //
  //   setInputs({ ...inputs, [name]: value });
  // };
  //
  const [startDate, setStartDate] = useState(toZeroSecondFn(new Date()));
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
    setStartDate(toZeroSecondFn(new Date()));
    setEndDate(startDate);
  }, []);
  //
  return (
    <ColumnFlexDiv>
      <Title>상품 등록</Title>
      <label>상품명 </label>
      <input name="name" ref={(el) => (newProduct.current.name = el)} />
      <br />
      <label>상품 이미지 </label>
      <input name="img" type="file" accept="image/*" style={{ transform: "translateX(2vw)" }} onChange={(e) => setImg(e.target.files[0])} />
      <br />
      <AddProductImg src={img ? URL.createObjectURL(img) : <></>} alt="" />
      <br />
      <label>상품 설명 </label>
      <input name="content" ref={(el) => (newProduct.current.content = el)} />
      <br />
      <label>재고 수량 </label>
      <input name="stock_count" type="number" min={"0"} ref={(el) => (newProduct.current.stock_count = el)} />
      <br />
      <label>즉시 구매가 </label>
      <input name="price" type="number" step={"1000"} min={"0"} ref={(el) => (newProduct.current.price = el)} onClick={(e) => autoCalculationFn(e.target)} onBlur={(e) => autoCalculationFn(e.target)} />
      <br />
      <label>공동 구매가 </label>
      <input name="discount_price" type="number" step={"1000"} min={"0"} ref={(el) => (newProduct.current.discount_price = el)} onClick={(e) => autoCalculationFn(e.target)} onBlur={(e) => autoCalculationFn(e.target)} />
      <br />
      <label>공동 구매 할인율 (%) </label>
      <input name="discount_rate" type="number" step={"10"} min={"0"} max={"100"} ref={(el) => (newProduct.current.discount_rate = el)} onClick={(e) => autoCalculationFn(e.target)} onBlur={(e) => autoCalculationFn(e.target)} />
      <br />
      <DatePicker stateArr={[startDate, setStartDate, endDate, setEndDate]} fn={[toZeroSecondFn]} />
      <br />
      <button onClick={addProductFn}>상품 등록하기</button>
      <br />
    </ColumnFlexDiv>
  );
  function autoCalculationFn(target) {
    //
    const discountPrice = newProduct.current.discount_price.value;
    const discountRate = newProduct.current.discount_rate.value;
    const price = newProduct.current.price.value;
    //
    const isPriceNull = (discountPrice !== "" || discountRate !== "") && price === "";
    if (isPriceNull) {
      //
      newProduct.current.discount_price.value = "";
      newProduct.current.discount_rate.value = "";
      alert("즉시 구매가를 먼저 입력해주세요");
      return;
    }
    const priceCheck = Number(discountPrice) > Number(price);
    if (priceCheck) {
      //
      alert("공동 구매가는 즉시 구매가보다 할인된 가격이어야 합니다.");
      newProduct.current.discount_price.value = price;
      newProduct.current.discount_rate.value = 0;
      return;
    }
    const isZero = price === "0" && (discountPrice === "0" || discountRate === "0");
    if (isZero) {
      //
      newProduct.current.discount_price.value = 0;
      newProduct.current.discount_rate.value = 0;
      alert("무료 상품으로 설정하셨습니다.");
      return;
    }
    if (target.value === "") {
      //
      switch (target.name) {
        case "price":
          newProduct.current.discount_price.value = "";
          newProduct.current.discount_rate.value = "";
          return;
        case "discount_price":
          newProduct.current.discount_rate.value = "";
          return;
        case "discount_rate":
          newProduct.current.discount_price.value = "";
          return;
        default:
          return;
      }
    }
    const _price = Number(price);
    const _discountRate = Number(discountRate);
    const _discountPrice = Number(discountPrice);
    //
    const isAutoDiscountPrice = target.name === "discount_rate" && price !== "";
    const isAutoDiscountRate = (target.name === "price" && discountPrice !== "") || (target.name === "discount_price" && price !== "");
    //
    if (isAutoDiscountRate) {
      //
      const autoDiscountRate = parseInt(((_price - _discountPrice) / _price) * 100);
      //
      newProduct.current.discount_rate.value = autoDiscountRate;
      return;
    }
    if (isAutoDiscountPrice) {
      //
      const autoDiscountPrice = parseInt((_price * (100 - _discountRate)) / 100);
      //
      newProduct.current.discount_price.value = autoDiscountPrice;
    }
  }
  function addProductFn() {
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
  function toZeroSecondFn(_date) {
    //
    const date = _date.getDate();
    const hour = _date.getHours();
    const month = _date.getMonth();
    const year = _date.getFullYear();
    const minute = _date.getMinutes();
    //
    return new Date(year, month, date, hour, minute, 0);
  }
};
export default AddProduct;
