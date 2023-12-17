const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        requestLoan(state, action) {
            if (state.loan > 0) return;

            state.balance += action.payload.amount
            state.loan = action.payload.amount
            state.loanPurpose = action.payload.purpose
        },
        payLoan(state) {
            state.loan = 0
            state.balance -= state.loan
            state.loanPurpose = ""
        },
        convertCurrency(state) {
            state.isLoading = true
        }

    }
})

export const { withdraw, requestLoan, payLoan, convertCurrency } = accountSlice.actions

export default accountSlice.reducer

export function deposit(amount, currency) {
    if (currency === "USD") {
        return deposit(amount)
    }

    return async function (dispatch, getState) {
        dispatch(convertCurrency())
        const host = 'api.frankfurter.app';
        await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
            .then(resp => resp.json())
            .then((data) => {
                dispatch(deposit(data.rates.USD))
            });
    }
}



// redux
// export default function accountReducer(state = initialState, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return { ...state, balance: state.balance + action.payload , isLoading:false };
//         case "account/withdraw":
//             return { ...state, balance: state.balance - action.payload };
//         case "account/requestLoan":
//             if (state.loan > 0) return state
//             return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: action.payload.amount + state.balance }
//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan
//             }
//         case "account/convertCurrency":
//             return {...state,isLoading : true}

//         default:
//             return state
//     }
// }

// export function deposit(amount, currency) {
//     if (currency === "USD") {
//         return { type: "account/deposit", payload: amount }
//     }

//     return async function  (dispatch, getState) {
//         dispatch({type:"account/convertCurrency"})
//         const host = 'api.frankfurter.app';
//        await  fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`)
//             .then(resp => resp.json())
//             .then((data) => {
//                 dispatch({ type: "account/deposit", payload: data.rates.USD })
//             });
//     }
// }
// export function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount }
// }
// export function requestLoan(_amount, _purpose) {
//     return { type: "account/requestLoan", payload: { amount: _amount, purpose: _purpose } }
// }
// export function payLoan() {
//     return { type: "account/payLoan", }
// }
