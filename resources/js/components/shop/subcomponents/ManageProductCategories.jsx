import React from "react";
import getCategoriesAndSubcategories from "../../../functions/getCategoriesAndSubcategories.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";

 function ManageProductCategories ({
   showThisComponent = () => {}
 }) {

     const [categoriesList, setCategoriesList] = React.useState([]);

     const [subcategoriesList, setSubcategoriesList] = React.useState([]);

     const [listOnDisplay, setListOnDisplay] = React.useState([]);

     const {
       token
     } = React.useContext(AuthContext);

     const {
       setCategoryOrSubcategoryInDetails
     } = React.useContext(ShopContext);

     React.useEffect(() => {

         (async function () {

             const response = await getCategoriesAndSubcategories(token);

             if (response.success) {

                 setCategoriesList(response.data.categories);

                 setSubcategoriesList(response.data.subcategories);

                 setListOnDisplay(response.data.categories);

             }

         })();

     }, []);

     return (
       <>

           <header>

             <section>

               <button onClick={() => showThisComponent(false)}>Close</button>

               <h1>Product Categories Painel</h1>

             </section>


             <section>

               <button onClick={() => setListOnDisplay(categoriesList)}>Categories</button>

               <button onClick={() => setListOnDisplay(subcategoriesList)}>Sub-Categories</button>

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
