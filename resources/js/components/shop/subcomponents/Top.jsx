import React from "react";

 function Top ({closeShop}) {

     return (
       <div>

         <button onClick={() => closeShop()}>Close</button>

         <input type="text" placeholder="Search product" />

         <button>Options</button>

       </div>
     );

 }

 export default Top;
