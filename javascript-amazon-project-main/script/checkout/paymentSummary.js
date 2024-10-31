import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { currencyFormat } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {addOrder} from "../../data/orders.js";

export function renderPaymemtSummary(){
   let productpriceCents = 0;
   let shippingPriceCents = 0;
   cart.forEach((cartItem)=>{
      const matchingProduct=getProduct(cartItem.productId);
      productpriceCents += matchingProduct.priceCents * cartItem.quantity;
      const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents += deliveryOption.priceCents;
   });
   const totalBeforeTaxCents=productpriceCents + shippingPriceCents;
   const taxCents = totalBeforeTaxCents *0.1;
   const totalCents = totalBeforeTaxCents + taxCents;
   
   let html='';
   html += `  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${currencyFormat(productpriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyFormat(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyFormat(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyFormat(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyFormat(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-your-order-button">
            Place your order
          </button>`
      
     document.querySelector('.js-payment-summary')
               .innerHTML=html; 
               
     document.querySelector('.js-place-your-order-button')
          .addEventListener('click',async()=>{
            try{
              const response = await fetch('https://supersimplebackend.dev/orders' , {
                method : 'POST' , 
                headers: {
                         'Content-Type' : 'application/json'
                         },
                body : JSON.stringify( {
                        cart  : cart
                        })
               });
               const order = await response.json();
               addOrder(order);

               window.location.href = 'orders.html';
              }
               catch(err){
                console.log('try again , some problem is there');
              }
            }) 
 
}
          