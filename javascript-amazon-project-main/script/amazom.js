import {cart , addToCart} from '../data/cart.js';
import { products, loadProducts} from '../data/products.js';
import { currencyFormat } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){
    let productHtml=``;
    products.forEach((product)=>{
      const html= `<div class="product-container">
                      <div class="product-image-container">
                        <img class="product-image"
                          src="${product.image}">
                      </div>

                      <div class="product-name limit-text-to-2-lines">
                        ${product.name}
                      </div>

                      <div class="product-rating-container">
                        <img class="product-rating-stars"
                          src=${product.getStarsUrl()}>
                        <div class="product-rating-count link-primary">
                          ${product.rating.count}
                        </div>
                      </div>

                      <div class="product-price">
                        ${product.getPrice()}
                      </div>

                      <div class="product-quantity-container">
                        <select>
                          <option selected value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                    </div>
                    ${product.extraInfo()} 

                    <div class="product-spacer"></div>

                      <div class="added-to-cart">
                        <img src="images/icons/checkmark.png">
                        Added
                      </div>

                      <button class="add-to-cart-button button-primary js-add-to-button"
                              data-product-id="${product.id}">
                        Add to Cart
                      </button> 
                  </div> `
      productHtml+=html;       
    });

    document.querySelector('.js-product-grid').innerHTML=productHtml;


    function updateCartQuantity(){
      let cartQuantity=0;
      cart.forEach((item)=>{
        cartQuantity+=item.quantity;
      })
      document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

      
    };
    

    document.querySelectorAll('.js-add-to-button')
            .forEach((addbutton)=>{
                  addbutton.addEventListener('click',()=>{
                //   document.querySelector('added-to-cart').innerHTML='Added';
                const productID=addbutton.dataset.productId ;
                addToCart(productID);
                updateCartQuantity();
                
            }); 
    });  
}          

//this below function is also same but it is correct for only one add to button . it does not select all buttons.
/*document.querySelector('.js-add-to-button')
            .addEventListener('click',()=>{
             //   document.querySelector('added-to-cart').innerHTML='Added';
                 console.log('y');
              });  */

        