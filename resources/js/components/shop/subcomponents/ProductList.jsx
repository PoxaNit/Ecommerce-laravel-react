import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";
import ProductCard from "./cards/ProductCard.jsx";

 function ProductList () {

     const { products } = React.useContext(ShopContext);



     return (
       <div>

         <ul>

           {
            Object.entries(products).forEach(([key, value]) => {
                <ProductCard product={} //...
            })
           }

         </ul>

       </div>
     );

 }

 export default ProductList;
