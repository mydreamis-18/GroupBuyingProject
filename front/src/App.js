import { useSelector } from "react-redux";
import { AddProduct, Product } from "./page";
import { Routes, Route, navigate } from "react-router-dom";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const currentProductId = useSelector((state) => state.product_reducer.currentProductId);
  //
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
}
export default App;
