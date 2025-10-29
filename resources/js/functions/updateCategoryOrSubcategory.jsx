
 async function updateCategoryOrSubcategory (
   token,
   id,
   data,
   mode = null // Category by default. If "s", subcategory
 ) {

     let urlMode = (mode === "s") ? "subcategories" : "categories";

     const response = await fetch(`http://localhost:8000/api/product/${urlMode}/${id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify(data)
     });

     const json = await response.json();

     return json;

 }

 export default updateCategoryOrSubcategory;
