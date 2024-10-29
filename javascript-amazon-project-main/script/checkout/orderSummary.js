import {cart , removeFromCart , updateDeliveryOption} from'../../data/cart.js';
import { products , getProductById } from '../../data/products.js';
import {currencyFormat} from'../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymemtSummary } from './paymentSUmmary.js';



export function renderOrderSummary(){
     let CartsummaryHtml='';
      cart.forEach((cartItem)=>{
        const productId=cartItem.productId;

        const matchingProduct = getProductById(productId);
        const deliveryOptionId=cartItem.deliveryOptionId;
      
        const deliveryOption=getDeliveryOption(deliveryOptionId);

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
                  ${matchingProduct.getPrice()}
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

            html+=` <div class="delivery-option js-delivery-option"
                          data-product-id="${matchingProduct.id}"
                          data-delivery-option-id="${deliveryOption.id}">
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

                                renderPaymemtSummary();
                              });
                        });
      /*const today=dayjs();
      const deliveryDate=today.add(7,'days');
      deliveryDate.format('dddd, MMMM D');
      console.log(deliveryDate);*/

      document.querySelectorAll('.js-delivery-option')
                  .forEach((option)=>{
                    option.addEventListener('click',()=>{
                      const {productId,deliveryOptionId} = option.dataset;
                      updateDeliveryOption(productId,deliveryOptionId);
                      renderOrderSummary();
                      renderPaymemtSummary();
                    });
                  });

}  


            



           



