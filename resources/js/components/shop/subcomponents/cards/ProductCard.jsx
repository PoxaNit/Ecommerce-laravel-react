import React from "react";

 function ProductCard ({
   name = "",
   short_description = "",
   price = 0,
   imageUrl = "",
   stock = 0,
   viewDetails = () => {}
 }) {

     return (
       <div onClick={() => viewDetails()}>

         <img src={imageUrl} alt="Product image" />

         <strong>{name}</strong>

         <p>{short_description}</p>

         <strong>Price:</strong>

         <p>{price}</p>

         <strong>stock:</strong>

         <p>{stock}</p>

         <p>Click to see details</p>

       </div>
     );

 }

 export default ProductCard;
