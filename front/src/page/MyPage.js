import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { myPage_action } from "../redux/middleware"
import { RowFlexDiv } from "../styledComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//
const MyPage = () => {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toLoginPageFn = () => nav("/login");
  const { buyNowTransactions, buyTogetherTransactions } = useSelector((state) => ({
    buyNowTransactions: state.user_reducer.buyNowTransactions,
    buyTogetherTransactions: state.user_reducer.buyTogetherTransactions
  }), shallowEqual)
  //
  useEffect(() => {
    //
    dispatch(myPage_action(toLoginPageFn));
  }, []);
  //
  return (
    <>
      <RowFlexDiv style={{ fontSize: "1vw" }}>
        <span>상품명</span>
        <span>구매 가격</span>
        <span>구매 시각</span>
        <span>환불 여부</span>
        <span>환불 시각</span>
      </RowFlexDiv>
        {buyNowTransactions.toString()}
        {buyTogetherTransactions.toString()}
    </>
  );
};
export default MyPage;
