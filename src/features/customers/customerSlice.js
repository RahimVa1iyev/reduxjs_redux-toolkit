import { createSlice } from "@reduxjs/toolkit"

const initialState={
    fullName: "",
    nationalId: "",
    createdAt: ""
}


const customerSlice = createSlice({
    name:"customer",
    initialState,
    reducers: {
        createCustomer(state,action){
            console.log("action",action);
            state.fullName =  action.payload.fullName
            state.nationalId = action.payload.nationalId
        }
    }
})

export const {createCustomer} = customerSlice.actions

export default customerSlice.reducer


// export default function customerReducer(state = initialStateCustomer,action){
//     switch(action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                  fullName : action.payload.fullName,
//                  nationalId : action.payload.nationalId ,
//                  createdAt : action.payload.createdAt
//                  }
//             default :
//             return state
//     }
// }


// export function createCustomer (_fullname,_nationalId,_createdAt) {
//     return {type:"customer/createCustomer",payload:{fullName:_fullname ,nationalId:_nationalId,createdAt:_createdAt}}
// }