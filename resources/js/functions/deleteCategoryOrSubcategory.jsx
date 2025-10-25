
 async function deleteCategoryOrSubcategory (
   token,
   id,
   mode = null // If mode = "s", subcategory by id will be deleted. If not, category by id will be deleted
 ) {

     let urlMode = (mode === "s") ? "subcategories" : "categories";

     const response = await fetch(`http://localhost:8000/api/product/${urlMode}/${id}`, {
       method: "DELETE",
       headers: {
         Authorization: `Bearer ${token}`,
         Accept: "application/json"
       }
     });

     const json = await response.json();

     return json;

 }

 export default deleteCategoryOrSubcategory;
