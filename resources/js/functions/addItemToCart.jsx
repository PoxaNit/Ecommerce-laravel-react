import getCart from "./getCart.jsx";

 async function addItemToCart (
   userId = 0,
   productId = 0,
   token = "",
   quantity = 0
 ) {
console.log("adding item to cart: ", userId, productId, token, quantity)
     const response = await fetch(`http://localhost:8000/api/users/${userId}/cart/add-product/${productId}`, {
			      method:"POST",
			      headers:{
			        Authorization:`Bearer ${token}`,
			        "Content-Type":"Application/json",
                                Accept: "application/json"
                              },
			      body:JSON.stringify({quantity: quantity})
                            });
     const json = await response.json();
console.log("response: ", json)
     if (json.success) {

         localStorage.removeItem("cart");

         const cart = await getCart(token, userId);

         localStorage.setItem("cart", JSON.stringify(cart));

         return cart;

     }


 }

 export default addItemToCart;
