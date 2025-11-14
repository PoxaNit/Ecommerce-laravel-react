import fetchProducts from "./fetchProducts.jsx";

 async function getProducts (
   token = "",
   getCategoriesAlso = true
 ) {

     const localProducts = localStorage.getItem("products");

     if (localProducts) {

         const json = JSON.parse(localProducts);

         const data = {
           products: json
         };

         return {
           message: "OK",
           data: data,
           success: true
         };

     } else {

         const fetchedProducts = await fetchProducts(token, getCategoriesAlso);

         return fetchedProducts;

     }

 }

 export default getProducts;
