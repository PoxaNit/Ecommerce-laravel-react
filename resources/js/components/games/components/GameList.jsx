import React from "react";
import GameCard from "./GameCard";

 function GameList ({games}) {

     return (
       <div>

         <ul>
           {
              games.map(g => <GameCard game={g}/>)
           }
         </ul>

       </div>
     );

 }

 export default GameList;
