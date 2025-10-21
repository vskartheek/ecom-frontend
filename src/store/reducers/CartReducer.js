const initialState={
    cart:[],
    totalPrice:0,
    cartId:null
}

export const cartReducer=(state=initialState,action)=>{

    switch(action.type){
        case "ADD_TO_CART":
            const productToAdd=action.payload;
            const existingProduct=state.cart.find(
                (item)=>item.productId===productToAdd.productId
            )
            if(existingProduct){
                const updatedCart=state.cart.map(
                    (item)=>{
                        if(item.productId===productToAdd.productId){
                            return productToAdd;
                        }else{
                            return item;
                        }
                    }
                );
                return {
                    ...state,
                    cart:updatedCart
                }
            }
            else{
                const newCart=[...state.cart,productToAdd];
                return {
                    ...state,
                    cart:newCart,
                }
            }
        
        case "REMOVE_FROM_CART":
            const productIdToRemove=action.payload
            const filteredCartItems=state.cart.filter((item)=>item.productId!==productIdToRemove)
            return {
                ...state,
                cart:filteredCartItems
            }
        case "FETCHED_USER_CART":
            return {
                ...state,
                cart:action.payload,
                cartId:action.cartId,
                totalPrice:action.totalPrice
            };
        case "CLEAR_CART":
            return {
                cart:[],
                totalPrice:0,
                cartId:null
            }
    
        default:
            return state;
    }
}