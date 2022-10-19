import { login_action } from "../redux/middleware";
import { FlexDiv } from "../styledComponent";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
//
const Login = () => {
  //
  const dispatch = useDispatch();
  const loginData = useRef({});
  //
  return (
    <FlexDiv>
      <br />
      <input name="user_id" ref={(el) => (loginData.current.user_id = el)} />
      <br />
      <input name="password" ref={(el) => (loginData.current.password = el)} />
      <br />
      <button onClick={loginFn}>로그인</button>
      <br />
      <Link to="/signUp">회원가입 페이지로 이동</Link>
    </FlexDiv>
  );
  function loginFn() {
    //
    const _loginData = {};
    //
    for (const key in loginData.current) {
      //
      if (Object.hasOwnProperty.call(loginData.current, key)) {
        //
        const el = loginData.current[key];
        //
        _loginData[key] = el.value;
      }
    }
    dispatch(login_action(_loginData));
  }
};
export default Login;
