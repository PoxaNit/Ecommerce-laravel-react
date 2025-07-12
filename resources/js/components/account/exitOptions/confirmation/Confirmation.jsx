import React from "react";

 function FormConfirmation ({
   setShow = function(){},
   func = function (){}
 }) {

     return (
       <div>

         <h2>Logout</h2>

         <button onClick={() => setShow(false)}>cancel</button>

         <button onClick={() => func()}>ok</button>

       </div>
     );     

 }

 export default FormConfirmation;
