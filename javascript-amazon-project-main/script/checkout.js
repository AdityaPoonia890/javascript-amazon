import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymemtSummary } from "./checkout/paymentSUmmary.js";
//import  '../data/cart-oop.js';
//import '../data/cart-class.js';
import {  loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage(){
     await loadProductsFetch();
     console.log('load products');
     await loadCart();
     console.log('loaded cart');
     renderOrderSummary();
     console.log('loaded order summary');
     renderPaymemtSummary();
     console.log('loaded payment summary');

}
loadPage();





/*Promise.all([
    loadProductsFetch()  ,

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })    
]).then(()=>{
    renderOrderSummary();
    renderPaymemtSummary();
})*/

/*new Promise((resolve)=>{
    loadProducts(()=>{
    resolve(); 
    });
})
.then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
})
.then(()=>{
     renderOrderSummary();
     renderPaymemtSummary();
});*/

/*loadProducts(()=>{
                              this is a callback.
                               promises are used to write callbacks in a more readable manner.
renderOrderSummary();
renderPaymemtSummary();
});*/

/*
loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
        })
    })
 */