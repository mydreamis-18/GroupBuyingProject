import { FlexDiv, Title, AddProductImg } from "../styledComponent";
import { addProduct_action } from "../redux/middleware";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { DatePicker } from "../component";
//
const InputProduct = (props) => {
  //
  const { pageName } = props;
  const newProduct = useRef({});
  const dispatch = useDispatch();
  //
  const productsIdx = useSelector((state) => {
    console.log("E");
    return state.product_reducer.productsIdx;
  });
  const products = useSelector((state) => state.product_reducer.products);
  //
  // ㅜ 부모 컴포넌트의 등록 및 수정하기 버튼 클릭 시 DB에 저장하기 위해 부모 컴포넌트의 state 값 사용
  const [startDate, setStartDate] = useState(toZeroSecondFn(new Date()));
  const [endDate, setEndDate] = useState(startDate);
  //
  // ㅜ 사진 선택 시 이미지 미리보기 기능을 위해 리렌더링 유도
  const [img, setImg] = useState("");
  //
  // ㅜ undefined
  // console.log(products);
  //
  // ㅜ onChange = { inputsHandlerFn };
  // const inputsHandlerFn = (e) => {
  //   //
  //   const { name, value } = e.target;
  //   //
  //   newProduct.current = { ...newProduct.current, [name]: value };
  // };
  //
  // ㅜ
  console.log("1", products);
  // //
  // useEffect(() => {
  //   //
  //   console.log("2");
  // }, []);
  //
  // useEffect(() => {
  //   //
  //   // console.log("3", products);
  //   //
  //   // ㅜ 상품 정보 수정 페이지용
  //   if (pageName === "edit" && products.length !== 0) {
  //     //
  //     const product = products[productsIdx];
  //     //
  //     for (const key in newProduct.current) {
  //       //
  //       if (Object.hasOwnProperty.call(newProduct.current, key)) {
  //         //
  //         newProduct.current[key].value = product[key];
  //       }
  //     }
  //     // console.log(newProduct.current.img);
  //     setEndDate(new Date(product.end_date));
  //     setStartDate(new Date(product.start_date));
  //   }
  // }, [products]);
  //
  // ㅜ location.pathname 현재 경로
  const location = useLocation();
  //
  return (
    <FlexDiv>
      <Title>{pageName === "add" ? "상품 등록" : "상품 정보 수정"}</Title>
      <label>상품명 </label>
      <input name="name" ref={(el) => (newProduct.current.name = el)} />
      <br />
      <label>상품 설명 </label>
      <input name="content" ref={(el) => (newProduct.current.content = el)} />
      <br />
      <label>상품 이미지 </label>
      <input name="img" type="file" accept="image/*" style={{ transform: "translateX(2vw)" }} onChange={(e) => setImg(e.target.files[0])} />
      <br />
      <AddProductImg src={img ? URL.createObjectURL(img) : <></>} alt="" />
      <br />
      <label>재고 수량 </label>
      <input name="stock_count" type="number" min={"0"} ref={(el) => (newProduct.current.stock_count = el)} />
      <br />
      <label>즉시 구매가 </label>
      <input name="price" type="number" step={"1000"} min={"0"} ref={(el) => (newProduct.current.price = el)} onClick={(e) => autoCalculationFn(e)} onBlur={(e) => autoCalculationFn(e)} />
      <br />
      <label>공동 구매가 </label>
      <input name="discount_price" type="number" step={"1000"} min={"0"} ref={(el) => (newProduct.current.discount_price = el)} onClick={(e) => autoCalculationFn(e)} onBlur={(e) => autoCalculationFn(e)} />
      <br />
      <label>공동 구매 할인율 (%) </label>
      <input name="discount_rate" type="number" step={"10"} min={"0"} max={"100"} ref={(el) => (newProduct.current.discount_rate = el)} onClick={(e) => autoCalculationFn(e)} onBlur={(e) => autoCalculationFn(e)} />
      <br />
      <DatePicker stateArr={[startDate, setStartDate, endDate, setEndDate]} fn={[toZeroSecondFn]} />
      <br />
      <button onClick={pageName === "add" ? addProductFn : editProductFn}>{pageName === "add" ? "상품 등록하기" : "상품 정보 수정하기"}</button>
      <br />
      <Link to={location.pathname + "addProduct"}>상품 등록 페이지로</Link>
    </FlexDiv>
  );
  function autoCalculationFn(e) {
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
      console.log(e);
      alert("공동 구매가는 즉시 구매가보다 할인된 가격이어야 합니다.");
      newProduct.current.discount_price.value = price;
      newProduct.current.discount_rate.value = 0;
      return;
    }
    const isZero = price === "0" && (discountPrice === "0" || discountRate === "0");
    if (isZero) {
      //
      console.log(e);
      newProduct.current.discount_price.value = 0;
      newProduct.current.discount_rate.value = 0;
      alert("무료 상품으로 설정하셨습니다.");
      return;
    }
    if (e.target.value === "") {
      //
      switch (e.target.name) {
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
    const isAutoDiscountPrice = e.target.name === "discount_rate" && price !== "";
    const isAutoDiscountRate = (e.target.name === "price" && discountPrice !== "") || (e.target.name === "discount_price" && price !== "");
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
  function editProductFn() {
    //
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
export default InputProduct;
