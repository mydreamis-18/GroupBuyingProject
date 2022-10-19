import { FlexDiv } from "../styledComponent";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
//
const SignUp = () => {
  //
  const userData = useRef({});
  //
  return (
    <FlexDiv>
      <br />
      <input name="user_id" ref={(el) => (userData.current.user_id = el)} />
      <br />
      <input name="password" ref={(el) => (userData.current.password = el)} />
      <br />
      <button onClick={signUp}>회원가입</button>
      <br />
      <Link to="/">로그인 페이지로 이동</Link>
    </FlexDiv>
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
    const signUp = await axios({
      //
      url: "http://localhost:8000/signUp",
      method: "post",
      data: _userData,
    });
    alert(signUp.data);
  }
};
export default SignUp;
