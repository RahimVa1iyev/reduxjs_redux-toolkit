
const initialStateCustomer={
    fullName: "",
    nationalId: "",
    createdAt: ""
}



export default function customerReducer(state = initialStateCustomer,action){
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


export function createCustomer (_fullname,_nationalId,_createdAt) {
    return {type:"customer/createCustomer",payload:{fullName:_fullname ,nationalId:_nationalId,createdAt:_createdAt}}
}