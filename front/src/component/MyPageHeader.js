import { RowFlexDiv, Span } from "../styledComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//
const MyPageHeader = () => {
  //
  const nav = useNavigate();
  const points = useSelector((state) => state.user_reducer.points);
  //
  return (
    <RowFlexDiv>
      <Span style={{ fontWeight: "900" }} onClick={() => nav("/myTransactions")}>
        ㅇMyTransactionsㅇ
      </Span>
      <Span style={{ fontWeight: "900" }}>ㅇMyPoints: {points}ㅇ</Span>
      <Span style={{ fontWeight: "900" }}>ㅇMyDataㅇ</Span>
    </RowFlexDiv>
  );
};
export default MyPageHeader;
