import {  products } from "./products.js";

const order = JSON.parse(localStorage.getItem('orders')) || [];

function getProducthere(productId){
  let matchingProduct = '';
  products.forEach((product)=>{
    if( productId === product.id){
      matchingProduct = product;
    }

  });
  console.log( matchingProduct.image);
};

export function addOrder(orders){
    order.unshift(orders);
    saveToStorage();
};

function getOrderImage(productId){
  let matchingProduct = '';
  matchingProduct = getProduct(productId);
  return matchingProduct.image;
}

function getOrderName(productId){
    let matchingProduct = '';
    matchingProduct = getProduct(productId);
    return`${ matchingProduct.name}`;
}

function saveToStorage(){
    localStorage.setItem('orders' , JSON.stringify(order));
}

function renderOrderContainerSummary(){
    let ordersContainerHtml = '';
    order.forEach((element) => {
        
        ordersContainerHtml += ` 

         <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div class="order-placed-date">${element.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div class="order-price">$${element.totalCostCents/100}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div class="order-id">${element.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
           ${renderOrderDetailsHtml(element.products)}
          </div>
        </div>
             

           `;

          });
    
          document .querySelector('.js-orders-grid').innerHTML=ordersContainerHtml;
}

function renderOrderDetailsHtml(products){
  let orderDetailsHtml = '';

  products.forEach((product)=>{
     orderDetailsHtml +=` 
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                heylo
              </div>
              <div class="product-delivery-date">
                Arriving on: ${product.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

           `;
           console.log(product.productId);
  })
  return orderDetailsHtml;

}
renderOrderContainerSummary();
getProducthere('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


