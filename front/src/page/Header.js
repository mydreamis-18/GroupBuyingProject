import { useDispatch, useSelector } from "react-redux";
import { RowFlexDiv } from "../styledComponent";
import { useNavigate } from "react-router-dom";
//
const Header = () => {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user_reducer.isLogin);
  //
  return (
    <RowFlexDiv>
      <span onClick={() => nav("/")}>Home</span>
      <span style={{ fontSize: "2vw", fontWeight: "initial", marginTop: "0.5vw" }}>isLogin- {isLogin.toString()}</span>
      {isLogin ? (
        <>
          <span onClick={() => nav("/myPage")}>MyPage</span>
          <span onClick={() => dispatch({ type: "LOGOUT" })}>Logout</span>
        </>
      ) : (
        <>
          <span onClick={() => nav("/login")}>Login</span>
          <span onClick={() => nav("/signUp")}>SignUp</span>
        </>
      )}
    </RowFlexDiv>
  );
};
export default Header;
