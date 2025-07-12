import fetchProducts from "./fetchProducts.jsx";

 function getProducts () {

     const localProducts = localStorage.getItem("products");

     if (localProducts) {

         const json = JSON.stringify(localProducts);

         return json;

     } else {

         const fetchedProducts = fetchProducts();

         return fetchedProducts;

     }

 }

 export default getProducts;
