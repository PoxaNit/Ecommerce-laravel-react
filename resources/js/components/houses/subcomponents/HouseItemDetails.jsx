import React from "react";
import getVolume from "../../../functions/getVolume.jsx";

 function HouseItemDetails ({
   item = {},
   showThisComponent = () => {},
   showItems = () => {}
 }) {

     const close = React.useCallback(() => {

         showThisComponent(false);

         showItems(true); // Go back to the item card list

     }, []);

     return (
       <div>

         <button onClick={() => close()}>Close</button>

         <img src={item.product.image_path} alt="Item image" />

         <strong>{item.product.name}</strong>

         <p>{item.product.description}</p>

         <p>Volume:
           <strong>
             {getVolume(item.product.width, item.product.length, item.product.height).toFixed(2)}m³
           </strong>
         </p>

         <p>Quantity in house: <strong>{item.quantity}</strong></p>

         <p>Total space occupancy:
           <strong>
             {(getVolume(item.product.width, item.product.length, item.product.height).toFixed(2) * item.quantity)}m³
           </strong>
         </p>

       </div>
     );

 }

 export default HouseItemDetails;
