export let cart= JSON.parse(localStorage.getItem('cart')) || [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
},
{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
}
];

function saveToStorage(){
   localStorage.setItem('cart',JSON.stringify(cart));
}

 export function addToCart(productID){
    let matchingItem;
               cart.forEach((item)=>{
                  if(item.productId===productID){
                    matchingItem=item;
                  }
               });
               if(matchingItem){
                matchingItem.quantity+=1;
               }
               else{
                cart.push({
                  productId:productID,
                  quantity:1
                 }) 
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