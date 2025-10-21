import { configureStore } from "@reduxjs/toolkit";
import {    productReducer} from "./reducers/ProductReducer.js";
import { errorReducer } from "./reducers/ErrorReducer.js";
import { categoryReducer } from "./reducers/CategoryReducer.js";
import { cartReducer } from "./reducers/CartReducer.js";
import { authReducer } from "./reducers/AuthReducer.js";
import { paymentMethodReducer } from "./reducers/PaymentMethodReducer.js";
import { adminReducer } from "./reducers/AdminReducer.js";
import { orderReducer } from "./reducers/OrderReducer.js";

const cartItems=localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    :[];

const user=localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
    :null;

const selectAddress=localStorage.getItem("selectedAddress")
    ? JSON.parse(localStorage.getItem("selectedAddress"))
    :null;
const initialState={
    carts:{
        cart:cartItems,
    },
    auth:{
        user:user,
        addresses:[],
        selectedAddress:selectAddress,
        clientSecretKey:null
    },
    admin:{
        analytics:{},
    }
    
}

export const store=configureStore({
    reducer:{
        products:productReducer,
        errors:errorReducer,
        categories:categoryReducer,
        carts:cartReducer,
        auth:authReducer,
        paymentMethod:paymentMethodReducer,
        admin:adminReducer,
        order:orderReducer
    },
    preloadedState: initialState,
})
export default store;