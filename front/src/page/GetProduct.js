import { useDispatch, useSelector } from "react-redux";
//
const GetProduct = () => {
  //
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product_reducer.products[0]);
  const isDefaultImg = useSelector((state) => state.product_reducer.isDefaultImg);
  const productsLength = useSelector((state) => state.product_reducer.productsLength);
  const productsCurrentIdx = useSelector((state) => state.product_reducer.productsCurrentIdx);
  //
  console.log(productsCurrentIdx);
  //
  return (
    <div>
      <div>detail</div>
      {isDefaultImg ? <img src={require("../img/defaultImg.PNG")} alt="" /> : <img src={product.img_path} alt="이미지" />}
      <p>{product.name}</p>
      <p>{product.content}</p>
      <p>{Date(product.start_date)} 시작</p>
      <p>즉시 구매가: {product.price}</p>
      <p>공동 구매가: {product.discount_price}</p>
      <p>잔여 수량: {product.stock_count}</p>
      <button onClick={prevProductBtn}>이전 상품</button>
      <button onClick={nextProductBtn}>다음 상품</button>
    </div>
  );
  function prevProductBtn() {
    //
    dispatch({ type: "PLUS_PRODUCTS_CURRENT_IDX" });
  }
  function nextProductBtn() {
    //
    dispatch({ type: "MINUS_PRODUCTS_CURRENT_IDX" });
  }
};
export default GetProduct;
