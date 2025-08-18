const intialState={
    categories:[],
    pagination:{}
}

export const categoryReducer=(state=intialState,action)=>{
    switch(action.type){
        case "FETCHED_CATEGORIES":
            return {
                ...state,
                categories:action.payload,
                pagination:{
                    ...state.pagination,
                    pageNumber:action.pageNumber,
                    pageSize:action.pageSize,
                    totalElements:action.totalElements,
                    totalPages:action.totalPages,
                    lastPage:action.lastPage
                }
            }
        default:
            return state;
    }
}