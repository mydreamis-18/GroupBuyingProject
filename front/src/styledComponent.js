import styled from "styled-components";
//
const FlexDiv = styled.div`
  border: 1px solid black;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  align-items: center;
  margin: 2vw 1vw;
  display: flex;
`;
const Title = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 3vw;
  margin: 1vw 0;
`;
const AddProductImg = styled.img`
  width: 10vw;
`;
const LoadingMsg = styled.p`
  text-align: center;
  font-weight: 900;
  margin-top: 40vh;
  font-size: 10vh;
`;
//
export { FlexDiv, Title, AddProductImg, LoadingMsg };
