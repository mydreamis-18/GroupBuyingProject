import { useDispatch, useSelector } from "react-redux"
import { RowFlexDiv } from "../styledComponent";
import { useNavigate } from "react-router-dom"
//
const Header = () => {
    //
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.user_reducer.isLogin);
    //
    return (
        <RowFlexDiv>
            <span onClick={() => nav("/")}>Home</span>
            <span style={{ fontSize: "2vw", marginTop: "0.5vw" }}>isLogin- {isLogin.toString()}</span>
            {isLogin ?
            <>
                <span onClick={() => nav("/myPage")}>MyPage</span>
                <span onClick={logoutFn}>Logout</span>
            </>
                :
            <>
                <span onClick={() => nav('/login')}>Login</span>
                <span onClick={() => nav("/signUp")}>SignUp</span>
            </>
            }
        </RowFlexDiv>
    )
    function logoutFn() {
        //
        dispatch({type: "LOGOUT"});
        sessionStorage.claer();
    }
}
export default Header;