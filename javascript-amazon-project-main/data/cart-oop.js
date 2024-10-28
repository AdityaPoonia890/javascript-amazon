function Cart(loadStorageKey){
  const cart={
    cartItems : undefined,

    
    loadFromStorage(){
         this.cartItems= JSON.parse(localStorage.getItem(loadStorageKey))  ;   
                 
         if(!this.cartItems){
           this.cartItems = [{
                 productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                 quantity:2,
                 deliveryOptionId:1
             },
             {
                 productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                 quantity:1,
                 deliveryOptionId:2
             }
         ];
         }
    } ,

    saveToStorage(){
       localStorage.setItem(loadStorageKey,JSON.stringify(this.cartItems));
    } ,

    addToCart(productID){
       if(this.cartItems.length===0){
         this.cartItems.push({
           productId:productID,
           quantity:1,
           deliveryOptionId:'2'
         })
       }
       else {
       let matchingItem;
                  this.cartItems.forEach((cartItem)=>{
                     if(cartItem.productId===productID){
                       matchingItem=cartItem;
                     }
                  });
                  if(matchingItem){
                   matchingItem.quantity+=1;
                  }
                  else{
                   this.cartItems.push({
                     productId:productID,
                     quantity:1,
                     deliveryOptionId:'2'
                    }) 
                  }
             }
        this.saveToStorage();          
     } ,
      
      removeFromCart(productID){
         const newCart=[];
           this.cartItems.forEach((item)=>{
             if(item.productId!=productID){
               newCart.push(item);
             }
           })
           cart=newCart;
           saveToStorage();
     }  ,

      updateDeliveryOption(productId,deliveryOptionId){
       let matchingItem;
       this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId===productId){
             matchingItem=cartItem;
          }
   
       });
       matchingItem.deliveryOptionId=deliveryOptionId;
   
       this.saveToStorage();
     }
  
};

return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();
businessCart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
 
console.log(cart);
console.log(businessCart);

 

  