
 async function getCategoriesAndSubcategories(token) {

     const response = await fetch("http://localhost:8000/api/product/categories_subcategories", {
       method:"GET",
       headers: {
         Accept: "application/json",
         "Authorization": `Bearer ${token}`
       }
     });

     const json = await response.json();

     return json;

 }

 export default getCategoriesAndSubcategories;
