import { EditProduct, GetProduct, AddProduct, Temp, Loading, SignUp, Login } from "./page";
import { getAllProducts_action } from "./redux/middleware";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Header } from "./component";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  console.log(sessionStorage);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product_reducer.products);
  const isDoneLoading = useSelector((state) => state.product_reducer.isDoneLoading);
  //
  if (!isDoneLoading) {
    //
    dispatch(getAllProducts_action());
  }
  //
  else {
    console.log("[ COMPLETE ] GET_ALL_PRODUCTS", products);
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/" element={<LoadingRedirect page={<GetProduct />} />} />
      </Routes>
    </div>
  );
  ////////////////////////////////////
  function LoadingRedirect({ page }) {
    //
    return isDoneLoading ? page : <Loading />;
  }
}
export default App;
