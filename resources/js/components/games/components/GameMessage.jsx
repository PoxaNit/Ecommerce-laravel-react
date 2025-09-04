import React from "react";

 function GameMessage ({
   message = ""
 }) {

     return (
       <div>
         <strong>Game:</strong>
         <p>{message}</p>
       </div>
     );

 }

 export default GameMessage;
