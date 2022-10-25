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
const LeftP = styled.p`
  font-size: 3vw;
  margin: 1vw 0;
`;
const LoadingMsgP = styled.p`
  text-align: center;
  font-weight: 900;
  margin-top: 40vh;
  font-size: 10vh;
`;
const HeaderSpan = styled.span`
  font-weight: 900;
  font-size: 4vw;
`;
const SmallSpan = styled.span`
  text-align: center;
  font-size: 1.5vw;
  width: 15vw;
`;
const LargeSpan = styled.span`
  text-align: center;
  font-size: 1.5vw;
  width: 60vw;
`;
const Label = styled.label`
  font-size: 3vw;
  padding: 1vw;
`;
const Button = styled.button`
  padding: 0.5vw;
  margin: 0 1vw;
`;
const AddProductImg = styled.img`
  width: 10vw;
`;
export {
  //
  ColumnFlexDiv,
  AddProductImg,
  LoadingMsgP,
  RowFlexDiv,
  HeaderSpan,
  LargeSpan,
  SmallSpan,
  Button,
  TitleP,
  LeftP,
  Label,
};
