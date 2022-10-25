import { Loading, GetProduct, AddProduct, EditProduct, SignUp, Login, MyPage, MyData, MyTransactions, Temp } from "./page";
import { getAllProducts_action, verifyTokens_action } from "./redux/middleware";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Header } from "./component";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLoadingPage = useSelector((state) => state.product_reducer.isLoadingPage);
  const isUserDataReady = useSelector((state) => state.user_reducer.isUserDataReady);
  const isProductDataReady = useSelector((state) => state.product_reducer.isProductDataReady);
  //
  useEffect(() => {
    //
    const toLoginPageFn = () => nav("/login");
    //
    dispatch(verifyTokens_action(toLoginPageFn));
    dispatch(getAllProducts_action());
  }, []);
  //
  console.log("isUserDataReady:", isUserDataReady, ", isProductDataReady", isProductDataReady);
  if (isLoadingPage && isUserDataReady && isProductDataReady) {
    //
    setTimeout(() => dispatch({ type: "LOADINGPAGE_OFF" }), 2000);
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myData" element={<MyData />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/myTransactions" element={<MyTransactions />} />
        <Route path="/" element={<LoadingRedirect page={<GetProduct />} />} />
        <Route path="/login" element={<LoadingRedirect page={<Login />} />} />
        <Route path="/signUp" element={<LoadingRedirect page={<SignUp />} />} />
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
