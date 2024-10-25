export let cart= JSON.parse(localStorage.getItem('cart')) || [];/*|| [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId:1
},
{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:2
}
];*/

function saveToStorage(){
   localStorage.setItem('cart',JSON.stringify(cart));
}

 export function addToCart(productID){
    if(cart.length===0){
      cart.push({
        productId:productID,
        quantity:1,
        deliveryOptionId:'2'
      })
    }
    else {
    let matchingItem;
               cart.forEach((cartItem)=>{
                  if(cartItem.productId===productID){
                    matchingItem=cartItem;
                  }
               });
               if(matchingItem){
                matchingItem.quantity+=1;
               }
               else{
                cart.push({
                  productId:productID,
                  quantity:1,
                  deliveryOptionId:'2'
                 }) 
               }
          }
     saveToStorage();          
  }
  const newCart=[];
  export function removeFromCart(productID){
        cart.forEach((item)=>{
          if(item.productId!=productID){
            newCart.push(item);
          }
        })
        cart=newCart;
        saveToStorage();
  }

  export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
       if(cartItem.productId===productId){
          matchingItem=cartItem;
       }

    });
    matchingItem.deliveryOptionId=deliveryOptionId;

    saveToStorage();
  }