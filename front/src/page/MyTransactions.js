import { MyPageHeader, Transaction } from "../component";
import { RowFlexDiv, Span } from "../styledComponent";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//
const MyTransactions = () => {
  //
  const [myHistory, setMyHitory] = useState("거래 내역이 없습니다.");
  const transactions = useSelector((state) => state.transaction_reducer.transactions);
  //
  useEffect(() => {
    //
    if (transactions.length !== 0) {
      //
      const _transactions = transactions.map((el, idx) => <Transaction transactions={el} key={idx}></Transaction>);
      setMyHitory(_transactions);
    }
  }, [transactions]);
  //
  return (
    <>
      <MyPageHeader></MyPageHeader>
      <RowFlexDiv style={{ fontSize: "1vw" }}>
        <Span>상품명</Span>
        <Span>구매 가격</Span>
        <Span>구매 방법</Span>
        <Span>구매 시각</Span>
        <Span>환불 여부</Span>
        <Span>환불 시각</Span>
      </RowFlexDiv>
      {myHistory}
    </>
  );
};
export default MyTransactions;
