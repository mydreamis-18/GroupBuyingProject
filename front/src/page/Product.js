import { useDispatch, useSelector } from "react-redux";
import { getProduct_action } from "../redux/middleware";
//
const Product = () => {
  //
  const dispatch = useDispatch();
  const product = useSelector(state => state.product_reducer.product);
  const defaultImg = useSelector(state => state.product_reducer.defaultImg);
  //
  dispatch(getProduct_action.getProduct(1));
  console.log(product);
  //
  return (
    <div>
      <div>detail</div>
      {defaultImg ? <img src={require("../img/defaultImg.PNG")} alt="" /> : <img src={product.img_path} alt="이미지" />}
    </div>
  );
};
export default Product;
