import { Loading, GetProduct, AddProduct, EditProduct, SignUp, Login, MyPage, Temp } from "./page";
import { getAllProducts_action, verifyTokens_action } from "./redux/middleware";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./component";
import { useEffect } from "react";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isVerifying = useSelector(state => state.user_reducer.isVerifying);
  const { products, isLoadingPage } = useSelector(
    (state) => ({
      products: state.product_reducer.products,
      isLoadingPage: state.product_reducer.isLoadingPage,
    }),
    shallowEqual
  );
  //
  useEffect(() => {
    //
    const toLoginPageFn = () => nav("/login");
    //
    dispatch(verifyTokens_action(toLoginPageFn));
    dispatch(getAllProducts_action());
  }, []);
  //
  if (!isLoadingPage) {
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
    return isLoadingPage ? <Loading /> : page;
  }
}
export default App;
