const init = {
    //
    transactions: new Array(0)
}
function reducer(state = init, action) {
    //
    const { type, payload } = action;
    const { transactions } = state;
    let _transactions = null;
    //
    switch (type) {
        //
        case "ADD_TRANSACTIONS":
            let { buyNowTransactions, buyTogetherTransactions } = payload;
            buyNowTransactions = buyNowTransactions.map((el) => ({ ...el, Product: { ...el.Product, type: "바로 구매" } }));
            buyTogetherTransactions = buyTogetherTransactions.map((el) => ({ ...el, Product: { ...el.Product, type: "공동 구매" } }));
            //
            _transactions = buyNowTransactions.concat(buyTogetherTransactions);
            _transactions.sort((a, b) => {
                if (a.created_at > b.created_at) return 1;
                else if (a.created_at < b.created_at) return -1;
                return 0;
            })
            return { ...state, transactions: _transactions };
        //
        case "ADD_TRANSACTION":
            return state;
        //
        case "REFUND":
            _transactions = transactions.map((el) => {
                //
                if (el.Product.name === payload) {
                    //
                    return { ...el, is_Refund: true };
                }
                return el;
            })
            return { ...state, transactions: _transactions };
        //
        case "":
            return state;
        //
        default:
            return state;
    }
}
export default reducer;