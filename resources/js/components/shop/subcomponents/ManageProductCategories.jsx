import React from "react";
import getCategoriesAndSubcategories from "../../../functions/getCategoriesAndSubcategories.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import CreateCategoryOrSubcategory from "./CreateCategoryOrSubcategory.jsx";

 function ManageProductCategories ({
   showThisComponent = () => {}
 }) {

     const {
       token
     } = React.useContext(AuthContext);

     const {
       setCategoryOrSubcategoryInDetails,
       categories,
       setCategories,
       subcategories,
       setSubcategories
     } = React.useContext(ShopContext);


     const [listOnDisplay, setListOnDisplay] = React.useState(categories);

     const [showCreateForm, setShowCreateForm] = React.useState(false);

     if (showCreateForm) {

         return (
             <CreateCategoryOrSubcategory
               showThisComponent={setShowCreateForm}
             />
         );

     }


     return (
       <>

           <header>

             <section>

               <button onClick={() => showThisComponent(false)}>Close</button>

               <h1>Product Categories Painel</h1>

             </section>


             <section>

               <button onClick={() => setListOnDisplay(categories)}>Categories</button>

               <button onClick={() => setListOnDisplay(subcategories)}>Sub-Categories</button>

               <button onClick={() => setShowCreateForm(true)}>Create new</button>

             </section>

           </header>             

           <ul>{
             listOnDisplay.map(c => {

                 return (

                   <li onClick={() => {

                       setCategoryOrSubcategoryInDetails(c);

                       showThisComponent(false);

                   }}>
                     <strong>{c.name}</strong>
                   </li>

                 );
             }
           )}</ul>

       </>
     );

 }

 export default ManageProductCategories;
