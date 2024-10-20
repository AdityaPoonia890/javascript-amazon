export const cart=[];

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
  }