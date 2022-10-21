import { login_action } from "../redux/middleware";
import { ColumnFlexDiv } from "../styledComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
//
const Login = () => {
  //
  const dispatch = useDispatch();
  const loginData = useRef({});
  const nav = useNavigate();
  //
  return (
    <ColumnFlexDiv>
      <br />
      <input name="user_id" ref={(el) => (loginData.current.user_id = el)} />
      <br />
      <input name="password" ref={(el) => (loginData.current.password = el)} />
      <br />
      <button onClick={loginFn}>로그인</button>
      <br />
    </ColumnFlexDiv>
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
    dispatch(login_action(_loginData, nav));
  }
};
export default Login;
