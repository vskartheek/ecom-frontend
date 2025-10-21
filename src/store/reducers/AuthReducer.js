const initialState={
    user:null,
    addresses:[],
    selectedAddress:null,
    clientSecretKey:null
}

export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case "LOGIN_USER":
            return {
                ...state,
                user:action.payload
            }
        case "LOGOUT_USER":
            return {
                
                user:null,
                addresses:null,
            }
        
        case "FETCHED_USER_ADDRESSES":
            return {
                ...state,
                addresses:[...action.payload]
            }
        case "SET_SELECTED_ADDRESS":
            return {
                ...state,
                selectedAddress:action.payload
            }
        case "SET_CLIENT_SECRET_KEY":
            return {
                ...state,
                clientSecretKey:action.payload
            }
        default:
            return state;
    }
    return state;
}