
 const fetchProduct = async (token) => {

     const response =
       await fetch("http://localhost:8000/api/products", {
         method:"GET",
         headers:{
           "Authorization":`Bearer ${token}`
         }
       });

     const json = await response.json();

     const products = json.data;

     const productsToLocalStorage = JSON.stringify(products);

     localStorage.setItem("products", productsToLocalStorage);

     return products;
 }

 export default fetchProduct;
