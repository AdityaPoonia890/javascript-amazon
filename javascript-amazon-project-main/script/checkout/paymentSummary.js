import { cart } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { currencyFormat } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
export function renderPaymemtSummary(){
   let productpriceCents = 0;
   let shippingPriceCents = 0;
   cart.forEach((cartItem)=>{
      const matchingProduct=getProductById(cartItem.productId);
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

          <button class="place-order-button button-primary">
            Place your order
          </button>`
      
     document.querySelector('.js-payment-summary')
               .innerHTML=html;     
 
}