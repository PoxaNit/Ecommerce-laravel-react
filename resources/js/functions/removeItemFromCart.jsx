import getCart from "./getCart.jsx";

 async function removeItemFromCart (
   productId = 0,
   quantity = 0,
   userId = 0,
   token = ""
 ) {
console.log("executing removeItem/finish...")

console.log(`removeItemFromCart: aqui estão os argumentos passados: productId: ${productId}, quantity: ${quantity}, userId: ${userId}, token: ${token}`)
         const response = await fetch(`http://localhost:8000/api/users/${userId}/cart/remove-product/${productId}`, {
           method:"POST",
           headers:{
             Authorization:`Bearer ${token}`,
             "Content-Type":"Application/json"
           },
           body:JSON.stringify({quantity: quantity})
         });
console.log("request made!")
         const json = await response.json();

         const cart = await getCart(token, userId);

         console.log(`removeItem: json: ${JSON.stringify(json)}, cart: ${JSON.stringify(cart)}`)

         return cart;

     }

 export default removeItemFromCart;
