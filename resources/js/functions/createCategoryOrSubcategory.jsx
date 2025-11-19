
 async function createCategoryOrSubcategory (
   token,
   data,
   mode // If "s", is subcategory
 ) {

     const urlMode = (mode === "s" ? "subcategories" : "categories");
console.log(`urlMode: ${urlMode}`)
     const response = await fetch(`http://localhost:8000/api/product/${urlMode}`, {
       method: "POST",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
         Accept: "application/json"
       },
       body: JSON.stringify(data)
     });

     const json = await response.json();
console.log(`creating category function: response json: ${JSON.stringify(json)}`)
     return json;

 }

 export default createCategoryOrSubcategory;
