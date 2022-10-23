import { RowFlexDiv, Span, Button } from "../styledComponent";
//
const Transaction = (props) => {
    //
    const { name, price, type } = props.transactions.Product;
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
                    <Span><Button>환불</Button></Span><Span></Span>
                </>
            }
        </RowFlexDiv>
    )
}
export default Transaction;