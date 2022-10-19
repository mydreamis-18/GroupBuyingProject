import { ColumnFlexDiv } from "../styledComponent";
import { useRef } from "react";
import axios from "axios";
//
const SignUp = () => {
  //
  const userData = useRef({});
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
