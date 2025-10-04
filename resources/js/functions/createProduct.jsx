
 async function createProduct (token, formData) {

     const response = await fetch(`http://localhost:8000/api/products`, {
       method: "POST",
       headers: {
         Accept: "application/json",
         Authorization: `Bearer ${token}`
       },
       body: formData
     });

     const json = await response.json();

     if (json.data) localStorage.setItem("products", JSON.stringify(json.data));

     return json;

 }

 export default createProduct;
