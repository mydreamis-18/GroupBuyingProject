import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//
const GetProduct = () => {
  //
  const isDefaultImg = useSelector((state) => state.product_reducer.isDefaultImg);
  const productsIdx = useSelector((state) => state.product_reducer.productsIdx);
  const products = useSelector((state) => state.product_reducer.products);
  const dispatch = useDispatch();
  //
  const product = products[productsIdx];
  const [DDay, setDDay] = useState(product === undefined ? "" : getDDayFn);
  //
  if (product !== undefined) {
    //
    setTimeout(() => {
      //
      setDDay(getDDayFn);
    }, 1000);
  }
  return (
    <div style={{ border: "1px solid black", margin: "10vw", padding: "2vw" }}>
      {product === undefined ? (
        <p>등록된 상품이 없습니다.</p>
      ) : (
        <>
          <img src={isDefaultImg ? require("../img/default.PNG") : "서버 주소" + product.img_path} alt="이미지" />
          <p>상품명: {product.name}</p>
          <br />
          <p>상품 설명: {product.content}</p>
          <br />
          <p>{DDay}</p>
          <br />
          <p>즉시 구매가: {product.price}원</p>
          <br />
          <p>공동 구매가: {product.discount_price}원</p>
          <br />
          <p>잔여 수량: {product.stock_count}</p>
          <br />
          <button onClick={prevProductFn}>이전 상품</button>
          <br />
          <br />
          <button onClick={nextProductFn}>다음 상품</button>
        </>
      )}
    </div>
  );
  function getDDayFn() {
    //
    const isFuture = new Date(product.start_date) - new Date() > 0;
    if (isFuture) {
      return (
        <>
          곧 공동 구매가 시작됩니다.
          <br />
          {dateToStringFn(product.start_date)} 시작
        </>
      );
    }
    const isPast = new Date(product.end_date) - new Date() < 0;
    if (isPast) {
      return (
        <>
          공동 구매가 종료되었습니다.
          <br />
          {dateToStringFn(product.end_date)} 종료
        </>
      );
    }
    const timeInterval = new Date(product.end_date) - new Date();
    //
    let seconds = Math.floor((timeInterval / 1000) % 60);
    let days = Math.floor(timeInterval / 1000 / 60 / 60 / 24);
    let minutes = Math.floor((timeInterval / 1000 / 60) % 60);
    let hours = Math.floor((timeInterval / 1000 / 60 / 60) % 24);
    //
    days = toTwoDigitNumber(days);
    hours = toTwoDigitNumber(hours);
    minutes = toTwoDigitNumber(minutes);
    seconds = toTwoDigitNumber(seconds);
    //
    return (
      <>
        공동 구매가 진행 중입니다.
        <br />
        종료까지 {days}일 {hours}:{minutes}:{seconds} 남음
      </>
    );
  }
  function prevProductFn() {
    //
    dispatch({ type: "MINUS_PRODUCTS_IDX" });
  }
  function nextProductFn() {
    //
    dispatch({ type: "PLUS_PRODUCTS_IDX" });
  }
  function dateToStringFn(_date) {
    //
    if (typeof _date === "string") {
      //
      _date = new Date(_date);
    }
    const day = _date.getDay();
    const year = _date.getFullYear();
    const date = toTwoDigitNumber(_date.getDate());
    const hour = toTwoDigitNumber(_date.getHours());
    const minute = toTwoDigitNumber(_date.getMinutes());
    const month = toTwoDigitNumber(_date.getMonth() + 1);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    //
    return `${year}년 ${month}월 ${date}일 ${days[day]}요일 ${hour}시 ${minute}분`;
  }
  function toTwoDigitNumber(number) {
    //
    const isTwoDigitNumber = number >= 10;
    if (isTwoDigitNumber) {
      //
      return number;
    }
    return "0" + number;
  }
};
export default GetProduct;
