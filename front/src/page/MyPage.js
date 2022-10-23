import { useDispatch, useSelector } from "react-redux";
import { myPage_action } from "../redux/middleware"
import { RowFlexDiv, Span } from "../styledComponent";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Transaction } from "../component";
//
const MyPage = () => {
  //
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toLoginPageFn = () => nav("/login");
  const [history, setHitory] = useState("거래 내역이 없습니다.");
  const transactions = useSelector((state) => state.user_reducer.transactions);
  //
  useEffect(() => {
    //
    dispatch(myPage_action(toLoginPageFn));
  }, []);
  //
  useEffect(() => {
    //
    if (transactions !== undefined) {
      //
      const _transactions = transactions.map((el) => <Transaction transactions={el}></Transaction>);
      setHitory(_transactions);
    }
  }, [transactions])
  //
  return (
    <>
      <RowFlexDiv style={{ fontSize: "1vw" }}>
        <Span>상품명</Span>
        <Span>구매 가격</Span>
        <Span>구매 방법</Span>
        <Span>구매 시각</Span>
        <Span>환불 여부</Span>
        <Span>환불 시각</Span>
      </RowFlexDiv>
      {history}
    </>
  );
};
export default MyPage;
