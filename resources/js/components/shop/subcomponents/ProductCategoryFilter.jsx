import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";

 function ProductCategoryFilter () {

     const { products } = React.useContext(ShopContext);

     const [categories, setCategories] = React.useState([]);

     const extractCategoriesFromProducts = React.useCallback(() => {

         let categoryList = [];

         products.forEach(product => {

             if (categoryList.some(c => c === ""))

         });

     }, []);

     return (
       <>

         <button>Couches</button>
         <button>Beds</button>
         <button>Blenders</button>
         <button>Microwaves</button>
         <button>Sofa</button>
         <button>Sofa</button>
         <button>Sofa</button>
         <button>Sofa</button>
         <button>Sofa</button>
         <button>Sofa</button>

       </>
     );

 }

 export default ProductCategoryFilter;
