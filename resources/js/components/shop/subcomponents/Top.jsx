import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";

 function Top ({closeShop}) {

     const { setShowOptions } = React.useContext(ShopContext);

     return (
       <div>

         <button onClick={() => closeShop()}>Close</button>

         <input type="text" placeholder="Search product" />

         <button onClick={() => setShowOptions(true)}>Options</button>

       </div>
     );

 }

 export default Top;
