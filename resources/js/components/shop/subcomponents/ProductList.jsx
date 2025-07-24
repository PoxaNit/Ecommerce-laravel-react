import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";
import ProductCard from "./cards/ProductCard.jsx";

 function ProductList () {

     const {
             productListOnDisplay,
             viewProduct
           } = React.useContext(ShopContext);

     return (

         <ul>

           { // Render all products

             Object.entries(productListOnDisplay).map(([key, value]) => {

                 return (
                     <li>

                         <ProductCard
                            name={value.name}
                            short_description={value.short_description}
                            price={value.price}
                            imageUrl={value.image_path}
                            stock={value.stock}
                            viewDetails={() => viewProduct(value)}
                         />

                     </li>

                 );

             })

           }

         </ul>

     );

 }

 export default ProductList;
