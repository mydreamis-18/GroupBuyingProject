import { Loading, GetProduct, AddProduct, EditProduct, SignUp, Login, MyPage, MyTransactions, Temp } from "./page";
import { getAllProducts_action, verifyTokens_action } from "./redux/middleware";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./component";
import { useEffect } from "react";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLoadingPage = useSelector((state) => state.product_reducer.isLoadingPage);
  //
  useEffect(() => {
    //
    const toLoginPageFn = () => nav("/login");
    //
    dispatch(verifyTokens_action(toLoginPageFn));
    dispatch(getAllProducts_action());
  }, []);
  //
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/myTransactions" element={<MyTransactions />} />
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
