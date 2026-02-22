
 async function editProduct (token, productId, json) {
console.log("editing product: ", token, productId, json)
     const response = await fetch (`http://localhost:8000/api/products/${productId}`, {
       method: "PATCH",
       headers:{
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json"
       },
       body: typeof json === "string" ? json : JSON.stringify(json)
     });


     const responseJson = await response.json();
console.log("json: ", responseJson)
     if (responseJson.success) localStorage.setItem("products", JSON.stringify(responseJson.data.products));

     return responseJson;

 }

 export default editProduct;
