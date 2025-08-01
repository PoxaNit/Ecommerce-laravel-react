
 async function getCart (token, user_id) {

     const cartFromLocalStorage = localStorage.getItem("cart");

     if (cartFromLocalStorage) {

         const json = JSON.parse(cartFromLocalStorage);

         return json;

     } else {

         const response = await fetch(`http://localhost:8000/api/users/${user_id}/cart`, {
                            method:"GET",
                            headers:{
                              Authorization:`Bearer ${token}`
                            }
                          });

         const json = await response.json();

         const cart = json.data;

         localStorage.setItem("cart", JSON.stringify(cart));

         return cart;

     }

 }

 export default getCart;
