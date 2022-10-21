import { useDispatch, useSelector } from "react-redux";
import { RowFlexDiv } from "../styledComponent";
import { useNavigate } from "react-router-dom";
//
const Header = () => {
  //
  const nav = useNavigate();
  const toMainPageFn = () => nav("/");
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user_reducer.isLogin);
  //
  return (
    <RowFlexDiv>
      <span onClick={() => nav("/")}>Home</span>
      {isLogin ? (
        <>
          <span onClick={() => nav("/myPage")}>MyPage</span>
          <span onClick={() => dispatch({ type: "LOGOUT", payload: toMainPageFn })}>Logout</span>
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
