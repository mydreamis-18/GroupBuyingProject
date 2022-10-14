import { getAllProducts_action } from "./redux/middleware";
import { AddProduct, GetProduct, Loading } from "./page";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const dispatch = useDispatch();
  const [isComplete, setIsComplete] = useState(false);
  const products = useSelector((state) => state.product_reducer.products);
  //
  useEffect(() => {
    //
    // console.log("2");
    dispatch(getAllProducts_action());
    //
  }, []);

  useEffect(() => {
    //
    if (products.length !== 0) {
      //
      console.log("[ COMPLETE ] GET_ALL_PRODUCTS", products);
      setTimeout(() => setIsComplete(true), 1000);
    }
  }, [products]);
  //
  // console.log("1");
  //
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoadingRedirect page={<GetProduct />} />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
  ////////////////////////////////////
  function LoadingRedirect({ page }) {
    //
    return isComplete ? page : <Loading />;
  }
}
export default App;
