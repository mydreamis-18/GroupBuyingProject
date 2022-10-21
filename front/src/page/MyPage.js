import { RowFlexDiv } from "../styledComponent";
//
const MyPage = () => {
  //
  return (
    <>
      <RowFlexDiv style={{ fontSize: "1vw" }}>
        <span>상품명</span>
        <span>구매 가격</span>
        <span>구매 수량</span>
        <span>구매 시각</span>
        <span>환불 여부</span>
        <span>환불 시각</span>
      </RowFlexDiv>
    </>
  );
};
export default MyPage;
