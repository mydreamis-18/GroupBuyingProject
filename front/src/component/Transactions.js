import { RowFlexDiv, Span, Button } from "../styledComponent";
import { refund_action } from "../redux/middleware";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//
const Transactions = (props) => {
    //
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { id, name, price, type } = props.transactions.Product;
    const { created_at, updated_at, is_refund } = props.transactions;
    //
    return (
        <RowFlexDiv style={{ fontSize: "1vw" }}>
            <Span>{name}</Span>
            <Span>{price}</Span>
            <Span>{created_at}</Span>
            <Span>{type}</Span>
            {is_refund ? <>
                <Span>"환불 완료"</Span><Span>{updated_at}</Span> </> :
                <>
                    <Span><Button onClick={refundFn}>환불</Button></Span><Span></Span>
                </>
            }
        </RowFlexDiv>
    )
    function refundFn() {
        //
        const toLoginPageFn = nav("/login");
        dispatch(refund_action(type, id, toLoginPageFn));
    }
}
export default Transactions;