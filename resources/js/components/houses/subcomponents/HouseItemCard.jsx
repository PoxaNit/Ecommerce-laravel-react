import React from "react";

 function HouseItemCard ({
   houseItem = {},
   showDetails = () => {},
   showItems = () => {} // It refers to the item card list (this component)
 }) {

     const seeDetails = React.useCallback(() => {

         showItems(false);

         showDetails(houseItem);

     }, []);


     return (
       <li onClick={() => seeDetails()}>

         <img src={houseItem.product.image_path}/>

         <strong>{houseItem.product.name}</strong>

         <p>{houseItem.product.short_description}</p>

         <p>click to details</p>

       </li>
     );

 }

 export default HouseItemCard;
