import styled from "styled-components";
//
const ColumnFlexDiv = styled.div`
  border: 1px solid black;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  align-items: center;
  margin: 2vw 1vw;
  display: flex;
`;
const RowFlexDiv = styled.div`
  justify-content: space-evenly;
  flex-direction: row;
  border-radius: 20px;
  align-items: center;
  margin: 2vw 1vw;
  display: flex;
`;
const TitleP = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 3vw;
  margin: 1vw 0;
`;
const HeaderSpan = styled.span`
  font-weight: 900;
  font-size: 4vw;
`;
const Span = styled.span`
  text-align: center;
  font-size: 1.5vw;
  width: 15vw;
`;
const AddProductImg = styled.img`
  width: 10vw;
`;
const LoadingMsgP = styled.p`
  text-align: center;
  font-weight: 900;
  margin-top: 40vh;
  font-size: 10vh;
`;
const Button = styled.button`
  margin: 0 1vw;
`;
export { ColumnFlexDiv, RowFlexDiv, TitleP, HeaderSpan, Span, AddProductImg, LoadingMsgP, Button };
