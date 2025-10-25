import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import deleteCategoryOrSubcategory from "../../../functions/deleteCategoryOrSubcategory.jsx";

 function CategoryOrSubcategoryDetails ({showThisComponent}) {

     const {
       categoryOrSubcategoryInDetails,
       setShowCategoriesManager
     } = React.useContext(ShopContext);

     const {
       token
     } = React.useContext(AuthContext);

     const shortName = categoryOrSubcategoryInDetails; // Just to not need to write the whole name each time

     return (
       <>

         <button onClick={() => {showThisComponent(false); setShowCategoriesManager(true)}}>Close</button>

         <h1>Details</h1>

         <p>ID: {shortName.id}</p>

         <h2>{shortName.name}</h2>

         {
           shortName?.parentCategory && ( // If it's a subcategory, show the main category wich this belongs to
             <p>Belongs to: <strong>{shortName.parentCategory}</strong></p>
           )
         }

         <button>Update</button>

         <button
           onClick={async () => {

             // Check if the object to be deleted is category or subcategory
               const isSubcategory = shortName?.parentCategory ? "s" : null;
console.log(`token: ${token}`)
               const response = await deleteCategoryOrSubcategory(token, shortName.id, isSubcategory);
console.log(JSON.stringify(response))

           }}
         >Delete</button>

       </>
     );

 }

 export default CategoryOrSubcategoryDetails;
