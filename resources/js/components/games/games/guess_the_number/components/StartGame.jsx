import React from "react";
import GameMessage from "../../../components/GameMessage.jsx";
import Horacio from "../../../components/Horacio.jsx";
import GuessContext from "../game_contexts/GuessContext.jsx";
import getRandomNumber from "../../../../../functions/getRandomNumber.jsx";
import LayoutOfGuessesController from "./LayoutOfGuessesController.jsx";
import GameContext from "../../../../../contexts/GameContext.jsx";

 function StartGame () {

     const {
       generatedNumber,
       setGeneratedNumber,
       numberInterval,
       setPlayerN,
     } = React.useContext(GuessContext);

     const {
       setGameOnDisplay
     } = React.useContext(GameContext);

     const generateNumber = React.useCallback(() => {

         const number = getRandomNumber(1, numberInterval);

         setGeneratedNumber(number);

     }, []);

     return (
       <div>

         <button
           onClick={() => setGameOnDisplay(null)}
         >Leave game
         </button>

         { (generatedNumber === 0) && (
             <>

               <Horacio
                 message="Generate the number to get started."
               />

               <button
                 onClick={() => generateNumber()}
               >Generate number</button>

             </>

           )

         }

         {
           !(generatedNumber === 0) && <LayoutOfGuessesController multiplayer={false} />
         }

       </div>
     );

 }

 export default StartGame;
