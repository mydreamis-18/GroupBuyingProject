import { Loading, GetProduct, AddProduct, EditProduct, SignUp, Login, MyPage, MyData, MyTransactions, Admin, Temp } from "./page";
import { getAllProducts_action, refreshPage_action } from "./redux/middleware";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header, AdminHeader } from "./component";
import { useState, useEffect } from "react";
import { HeaderLineDiv } from "./styledComponent";
import axios from "axios";
//
// addProduct 페이지에 대해서 관리자만 접근 가능하게 설정해야 함!
//
function App() {
  //
  const { isLoadingPage, isProductDataReady } = useSelector(
    (state) => ({
      isLoadingPage: state.product_reducer.isLoadingPage,
      isProductDataReady: state.product_reducer.isProductDataReady,
    }),
    shallowEqual
  );
  //
  const { isUserDataReady, isAdmin, userNum } = useSelector(
    (state) => ({
      isUserDataReady: state.user_reducer.isUserDataReady,
      isAdmin: state.user_reducer.isAdmin,
      userNum: state.user_reducer.userNum,
    }),
    shallowEqual
  );
  //
  const [adminId, setAdminId] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();
  //
  useEffect(() => {
    //
    dispatch(getAllProducts_action());
    //
    const toLoginPageFn = () => nav("/login");
    dispatch(refreshPage_action(toLoginPageFn));
    //
    (async () => {
      //
      const adminAccountId = await axios({ url: "http://localhost:8000", method: "post" });
      setAdminId(adminAccountId.data.adminAccountId);
    })();
  }, []);
  //
  useEffect(() => {
    //
    if (userNum !== undefined && userNum === adminId) {
      //
      dispatch({ type: "ADMIN_LOGIN" });
    }
  }, [userNum]);
  //
  if (isLoadingPage && isUserDataReady && isProductDataReady) {
    //
    setTimeout(() => dispatch({ type: "LOADINGPAGE_OFF" }), 2000);
  }
  console.log("isUserDataReady:", isUserDataReady, ", isProductDataReady", isProductDataReady);
  //
  return (
    <div className="App">
      <Header />
      {isAdmin ? <AdminHeader></AdminHeader> : <></>}
      <HeaderLineDiv></HeaderLineDiv>
      <Routes>
        <Route path="/admin" element={<Admin />} />
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
  //
}
export default App;
