import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//
const GetProduct = () => {
  //
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product_reducer.products);
  const productsIdx = useSelector((state) => state.product_reducer.productsIdx);
  const isDefaultImg = useSelector((state) => state.product_reducer.isDefaultImg);
  //
  const product = products[productsIdx];
  console.log(new Date(product.start_date));
  function getDDay() {
    //
    const timeInterval = new Date(product.start_date) - new Date();
    //
    const isFuture = timeInterval > 0;
    if (isFuture)
      return (
        <>
          곧 공동 구매가 시작됩니다.
          <br />
          시작 시간: {product.start_date.replace(" GMT+0900 (한국 표준시)", "")}
        </>
      );
    const isPast = timeInterval < 0;
    if (isPast) return `공동 구매가 종료되었습니다.\n${product.end_date}`;
    //
    const hours = Math.floor(timeInterval / 1000 / 60 / 60);
    const minutes = Math.floor(timeInterval / 1000 / 60);
    const seconds = Math.floor(timeInterval / 1000);
    return `종료 시간: ${hours}:${minutes}:${seconds}`;
  }
  //
  return (
    <div style={{ border: "1px solid black", margin: "10vw" }}>
      {isDefaultImg ? <img src={require("../img/defaultImg.PNG")} alt="" /> : <img src={product.img_path} alt="이미지" />}
      <p>상품명: {product.name}</p>
      <br />
      <p>상품 설명: {product.content}</p>
      <br />
      <p>{getDDay()}</p>
      <br />
      <p>즉시 구매가: {product.price}</p>
      <br />
      <p>공동 구매가: {product.discount_price}</p>
      <br />
      <p>잔여 수량: {product.stock_count}</p>
      <br />
      <button onClick={prevProductBtn}>이전 상품</button>
      <br />
      <br />
      <button onClick={nextProductBtn}>다음 상품</button>
    </div>
  );
  function prevProductBtn() {
    //
    dispatch({ type: "MINUS_PRODUCTS_IDX" });
  }
  function nextProductBtn() {
    //
    dispatch({ type: "PLUS_PRODUCTS_IDX" });
  }
};
export default GetProduct;
