import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymemtSummary } from "./checkout/paymentSummary.js";
//import  '../data/cart-oop.js';
//import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";

loadProducts(()=>{
    renderOrderSummary();
    renderPaymemtSummary();
})
