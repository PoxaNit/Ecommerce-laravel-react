
 async function deleteProduct (token, productId) {

     const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
       method: "DELETE",
       headers:{
         Accept: "application/json",
         Authorization: `Bearer ${token}`
       }
     });

     const json = await response.json();
console.log(`deleteProduct function: json: ${JSON.stringify(json)}`)
     return json.data;

 }

 export default deleteProduct;
