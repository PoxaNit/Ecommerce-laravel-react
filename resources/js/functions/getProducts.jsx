import fetchProducts from "./fetchProducts.jsx";

 async function getProducts (token = "") {

     const localProducts = localStorage.getItem("products");

     if (localProducts) {

         const json = JSON.parse(localProducts);

         return json;

     } else {

         const fetchedProducts = await fetchProducts(token);

         return fetchedProducts;

     }

 }

 export default getProducts;
