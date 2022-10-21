import { ColumnFlexDiv } from "../styledComponent";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
//
const SignUp = () => {
  //
  // 닉네임 추가해야 함!
  //
  const userData = useRef({});
  const nav = useNavigate();
  //
  return (
    <ColumnFlexDiv>
      <br />
      <input name="user_id" ref={(el) => (userData.current.user_id = el)} />
      <br />
      <input name="password" ref={(el) => (userData.current.password = el)} />
      <br />
      <button onClick={signUp}>회원가입</button>
      <br />
    </ColumnFlexDiv>
  );
  async function signUp() {
    //
    const _userData = {};
    //
    for (const key in userData.current) {
      //
      if (Object.hasOwnProperty.call(userData.current, key)) {
        //
        const el = userData.current[key];
        _userData[key] = el.value;
      }
    }
    const _signUp = await axios({
      //
      url: "http://localhost:8000/signUp",
      method: "post",
      data: _userData,
    });
    const { isSuccess, alertMsg } = _signUp.data;
    if (isSuccess) {
      //
      nav("/login");
    }
    alert(alertMsg);
  }
};
export default SignUp;
