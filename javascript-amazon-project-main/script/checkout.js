import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymemtSummary } from "./checkout/paymentSummary.js" ;
//import  '../data/cart-oop.js';
//import '../data/cart-class.js';
import { loadProducts , loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
    loadProductsFetch()  ,

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })    
]).then(()=>{
    renderOrderSummary();
    renderPaymemtSummary();
})

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