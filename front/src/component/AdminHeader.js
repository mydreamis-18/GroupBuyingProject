import { RowFlexDiv, HeaderSpan } from "../styledComponent";
import { useNavigate } from "react-router-dom";
//
const AdminHeader = () => {
  //
  const nav = useNavigate();
  //
  return (
    <RowFlexDiv>
      <HeaderSpan onClick={() => nav("/addProduct")}>Add Product</HeaderSpan>
      <HeaderSpan onClick={() => nav("/")}>Users</HeaderSpan>
    </RowFlexDiv>
  );
};
export default AdminHeader;
