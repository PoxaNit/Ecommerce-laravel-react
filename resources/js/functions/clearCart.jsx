
 async function clearCart (
   userId,
   token
 ) {
         const response =
           await fetch(`http://localhost:8000/api/users/${userId}/cart`, {
             method:"DELETE",
             headers:{
               Authorization:`Bearer ${token}`
             }
           });

     }

 export default clearCart;
