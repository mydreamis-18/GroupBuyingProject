import { EditProduct, GetProduct, AddProduct, Temp, Loading, SignUp, MyPage, Login } from "./page";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllProducts_action } from "./redux/middleware";
import { Routes, Route } from "react-router-dom";
import { Header } from "./component";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  console.log(sessionStorage);
  const dispatch = useDispatch();
  const { products, isOver, isLoadingPage } = useSelector(state => ({
    products: state.product_reducer.products,
    isOver: state.product_reducer.isOver,
    isLoadingPage: state.product_reducer.isLoadingPage,
  }), shallowEqual)
  if (!isOver) {
    //
    dispatch(getAllProducts_action());
  }
  //
  else if (!isLoadingPage) {
    //
    console.log("[ COMPLETE ] GET_ALL_PRODUCTS", products);
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/" element={<LoadingRedirect page={<GetProduct />} />} />
      </Routes>
    </div>
  );
  //
  ////////////////////////////////////
  function LoadingRedirect({ page }) {
    //
    return isLoadingPage ? page : <Loading />;
  }
}
export default App;
