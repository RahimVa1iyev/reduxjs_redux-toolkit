import { combineReducers, createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialStateCustomer={
    fullName: "",
    nationalId: "",
    createdAt: ""
}

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) return state
            return { ...state, loan : action.payload.amount , loanPurpose : action.payload.purpose , balance : action.payload.amount+state.balance}
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        default:
            return state
    }
}

function customerReducer(state = initialStateCustomer,action){
    switch(action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                 fullName : action.payload.fullName,
                 nationalId : action.payload.nationalId ,
                 createdAt : action.payload.createdAt
                 }
            default :
            return state
    }
}

const rootReducer = combineReducers({
    account : accountReducer,
    customer : customerReducer,
})

const store = createStore(rootReducer)

function deposit (amount) {
    return {type : "account/deposit", payload:amount}
}
function withdraw (amount) {
    return {type : "account/withdraw", payload:amount}
}
function requestLoan (_amount,_purpose) {
    return {type : "account/requestLoan", payload : {amount:_amount,purpose:_purpose}}
}
function payLoan () {
    return {type : "account/payLoan",}
}

function createCustomer (_fullname,_nationalId,_createdAt) {
    return {type:"customer/createCustomer",payload:{fullName:_fullname ,nationalId:_nationalId,createdAt:_createdAt}}
}
store.dispatch(createCustomer("Rahim Valiyev","45689658",new Date()))
store.dispatch(deposit(500))
store.dispatch(withdraw(200))
store.dispatch(requestLoan(500,"Hello"))
store.dispatch(payLoan())


console.log(store.getState());




console.log(store.getState());