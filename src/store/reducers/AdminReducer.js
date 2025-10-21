const initialState={
    products:[],
    pagination:{},
    analytics:{},
}


export const adminReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_ANALYTICS":
            return {
                ...state,
                analytics:action.payload
            }
        case "FETCH_ADMIN_PRODUCTS":
            return {
                ...state,
                products:action.payload.content,
                pagination:{
                    ...state.pagination,
                    totalPages:action.payload.totalPages,
                    pageNumber:action.payload.pageNumber,
                    pageSize:action.payload.pageSize,
                    totalElements:action.payload.totalElements,
                    lastPage:action.payload.lastPage
                }
            }
        default:
            return state;
    }
}