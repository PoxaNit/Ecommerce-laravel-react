
 const fetchProduct = async (token) => {

     const response =
       await fetch("http://localhost:8000/api/products", {
         method:"GET",
         headers:{
           "Authorization":`Bearer ${token}`
         }
       });

     const json = await response.json();

     const data = json;

     const productsToLocalStorage = JSON.stringify(data.data.products);

     localStorage.setItem("products", productsToLocalStorage);

     return data;
 }

 export default fetchProduct;
