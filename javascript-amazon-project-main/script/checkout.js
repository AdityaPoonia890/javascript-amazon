import {cart,removeFromCart} from'../data/cart.js';
import { products } from '../data/products.js';
import {currencyFormat} from'./utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let CartsummaryHtml='';


cart.forEach((cartItem)=>{
  const productId=cartItem.productId;
  let matchingProduct='';
  products.forEach((product)=>{
    if( productId===product.id){
      matchingProduct=product;
    }

  });
  
 let deliveryOption;
 deliveryOptions.forEach((option)=>{
   if(option.id===cartItem.deliveryOptionId){
    deliveryOption=option;
   }

 }); 
 const today=dayjs();
 const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
 const dateString=deliveryDate.format(
  `dddd, MMMM D`
 );

 CartsummaryHtml+=`
 <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.image}>
        </img>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${currencyFormat(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"
                         data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
         
         ${deliveryOptionsHtml(matchingProduct,cartItem)}

        </div>
    </div>
</div>`;

});

document.querySelector('.js-order-summary').innerHTML=CartsummaryHtml;

function deliveryOptionsHtml(matchingProduct,cartItem){
  let html='';
   deliveryOptions.forEach((deliveryOption)=>{
     const today=dayjs();
     const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
     const dateString=deliveryDate.format(
      `dddd, MMMM D`
     );
     const price=deliveryOption.priceCents
       ===0 
       ? 'FREE' : `${currencyFormat(deliveryOption.priceCents)} - `;

      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;

      html+=` <div class="delivery-option">
                  <input type="radio"
                  ${isChecked?'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"></input>
                 <div>
                    <div class="delivery-option-date">
                       ${dateString}
                   </div>
                   <div class="delivery-option-price">
                       $${price}Shipping
                   </div>
                </div>
             </div>`
   });
   return html;
}

document.querySelectorAll('.js-delete-link')
                   .forEach((link)=>{
                        link.addEventListener('click',()=>{
                           const productID=link.dataset.productId;
                           removeFromCart(productID);

                           const container=document.querySelector(`.js-cart-item-container-${productID}`);
                           container.remove();
                        })
                   });
/*const today=dayjs();
const deliveryDate=today.add(7,'days');
deliveryDate.format('dddd, MMMM D');
console.log(deliveryDate);*/




