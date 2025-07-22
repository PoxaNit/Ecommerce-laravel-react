
 async function checkout (userId) {

     const response = await fetch(`http://localhost:8000/api/users/${userId}/checkout`);

     const json = await response.json();

     

 }

 export default checkout;
