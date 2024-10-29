import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymemtSummary } from "./checkout/paymentSummary.js" ;
//import  '../data/cart-oop.js';
//import '../data/cart-class.js';
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
        resolve(); 
        });
    })  ,

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
  
renderOrderSummary();
renderPaymemtSummary();
});*/

