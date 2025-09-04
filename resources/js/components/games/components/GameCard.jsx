import React from "react";
import GameContext from "../../../contexts/GameContext.jsx";

 function GameCard ({
   game = {},
 }) {

     const {
       setGameInDetails
     } = React.useContext(GameContext);

     return (
       <li onClick={() => setGameInDetails(game)}>

         <img src={game.image_path} alt="Game image"/>

         <strong>{game.name}</strong>

         <p>Click to play</p>

       </li>
     );

 }

 export default GameCard;
