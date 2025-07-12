import React from "react";
import ExitOptions from "./exitOptions/ExitOptions.jsx";
import UserData from "./topInfo/UserData.jsx";

 function Account ({setShow = function(){}}) {

         return (
           <>

             <button onClick={() => setShow(false)}>close</button>

             <h1>User account</h1>

             <UserData />

             <ExitOptions />

           </>
         );

 }

 export default Account;
