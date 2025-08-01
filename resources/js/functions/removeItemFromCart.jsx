import getCart from "./getCart.jsx";

 async function removeItemFromCart (
   productId = 0,
   quantity = 0,
   userId = 0,
   token = ""
 ) {

         const response = await fetch(`http://localhost:8000/api/users/${userId}/cart/remove-product/${productId}`, {
           method:"POST",
           headers:{
             Authorization:`Bearer ${token}`,
             "Content-Type":"Application/json"
           },
           body:JSON.stringify({quantity: quantity})
         });

         const json = await response.json();

         const cart = await getCart(token, userId);

         return cart;

     }

 export default removeItemFromCart;
