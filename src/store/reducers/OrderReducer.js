const intialState={
    adminOrders:[],
    pagination:{},
}

export const orderReducer=(state=intialState,action)=>{
    switch(action.type){
        case "FETCH_ADMIN_ORDERS":
            return{
                ...state,
                adminOrders:action.payload.content,
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
            return state
    }
}
