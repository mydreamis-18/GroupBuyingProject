import { useDispatch, useSelector } from "react-redux";
import { getProduct_action } from "../redux/middleware";
//
const Product = () => {
  //
  const dispatch = useDispatch();
  const img = useSelector((state) => state.addProduct_reducer.img);
  //
  dispatch(getProduct_action.getProduct(29));
  console.log(img);
  //
  return (
    <div>
      <div>detail</div>
      <img src={img} alt="" />
    </div>
  );
};
export default Product;
