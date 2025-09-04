import React from "react";
import GameContext from "../../../contexts/GameContext.jsx";

 function GameDetails () {

     const {
       gameInDetails,
       setGameInDetails,
       setGameOnDisplay
     } = React.useContext(GameContext);


     const playThisGame = React.useCallback(() => {

         setGameOnDisplay(gameInDetails);
         setGameInDetails(null);

     }, [gameInDetails]);


     return (
       <div>
         <header>

           <button onClick={() => setGameInDetails(null)}>Close</button>

           <img src={gameInDetails.image_path} alt="Game image" />

           <strong>{gameInDetails.name}</strong>

         </header>

         <div>

           <p>{gameInDetails.description}</p>

           <button onClick={() => playThisGame()}>Play</button>

         </div>

       </div>
     );

 }

 export default GameDetails;
