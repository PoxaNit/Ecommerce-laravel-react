import React from "react";
import GuessContext from "../game_contexts/GuessContext.jsx";
import GameContext from "../../../../../contexts/GameContext.jsx";
import GameMessage from "../../../components/GameMessage.jsx";

 function Configuration () {

     const {
       setGameDifficulty,
       setNumberInterval,
       setConfiguration,
       setStartGame,
     } = React.useContext(GuessContext);

     const {
       setGameOnDisplay
     } = React.useContext(GameContext);

     const [chooseDifficulty, setChooseDifficulty] = React.useState(true);
     const [chooseNumberInterval, setChooseNumberInterval] = React.useState(false);


     const nextStep = React.useCallback(difficulty => {

         setGameDifficulty(difficulty);

         setChooseDifficulty(false);

         setChooseNumberInterval(true);

     }, []);

     const proceed = React.useCallback(numberInterval => {

         setNumberInterval(numberInterval);

         setConfiguration(false);

         setStartGame(true);

     }, []);

     return (
       <div>

         <button onClick={() => setGameOnDisplay(null)}>Leave game</button>

         {
             chooseDifficulty && (
               <>

                 <GameMessage 
                   message="Choose a difficulty:"
                 />

                 <button onClick={() => nextStep("easy")}
                 >Easy</button>

                 <button onClick={() => nextStep("normal")}
                 >Normal</button>

                 <button onClick={() => nextStep("hard")}
                 >Hard</button>

               </>
             )
         }

         {
             chooseNumberInterval && (
                 <>

                   <GameMessage
                     message="Choose a number interval:"
                   />

                   <button
                     onClick={() => proceed(100)}
                   >1 to 100</button>

                   <button
                     onClick={() => proceed(1000)}
                   >1 to 1000</button>

                   <button
                     onClick={() => proceed(10000)}
                   >1 to 10000</button>

                   <button
                     onClick={() => proceed(100000)}
                   >1 to 100000</button>

                 </>
             )
         }

       </div>
     );

 }

 export default Configuration;
