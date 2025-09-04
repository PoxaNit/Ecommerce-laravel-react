import React from "react";

 function PlayerMessage ({message, playerName = ""}) {

     return (
       <div>

         {playerName && <strong>{playerName}</strong>}

         <p>{message}</p>

       </div>
     );

 }

 export default PlayerMessage;
