import React from "react";
import GameMessage from "../../../components/GameMessage.jsx";
import Horacio from "../../../components/Horacio.jsx";
import GuessContext from "../game_contexts/GuessContext.jsx";
import PlayerMessage from "../../../components/PlayerMessage.jsx";

 function LayoutGuesses ({
   setChoosenNumber = () => {}, // Sends the number that playerInTurn has choosen to the father component (controller of this)
   showInputNumber = false,
   gameMessage = {},
   oldGameMessage = {},
   playerMessage = {},
   waitMessage = {},
   horacioMessage = {},
   setPlayLoop = () => {}, // Just allow a function to execute in the parent component
   showEndScreen = {}
 }) {

     const numberRef = React.useRef(null);

     const {
       setConfiguration,
       setStartGame,
       setGeneratedNumber
     } = React.useContext(GuessContext);

     return (
       <div>

        { oldGameMessage?.display && (
           <GameMessage
             message={oldGameMessage?.message}
           />
         )
        }

        {
          playerMessage?.display && (
            <>

              <PlayerMessage
                message={playerMessage?.message}
                name={playerMessage?.name}
              />

            </>
          )
        }

        {
          horacioMessage.display && (
            <Horacio
              message={horacioMessage.message}
              expression={horacioMessage?.expression && horacioMessage.expression}
            />
          )
        }

        {
          waitMessage?.display && (
            <GameMessage message={waitMessage?.message}
            />
          )
        }

        {
          gameMessage?.display && (

            <GameMessage
              message={gameMessage?.message}
            />

          )
        }

       {
         showInputNumber && (
             <>

	       <strong>You:</strong>

               <input ref={numberRef} type="number" />

               <button
                 onClick={() => {

                   if (!numberRef.current.value) return;

                   setChoosenNumber(numberRef.current.value);

		   setPlayLoop(true);

                 }}
               >Try</button>

             </>
         )
       }

       {
           showEndScreen?.display && (
               <>

                 <GameMessage
                   message={showEndScreen?.message}
                 />

                 <button
		   onClick={() => {

           /* Going back to the configuration screen */

		       setConfiguration(true);

                       setGeneratedNumber(0);

		       setStartGame(false);


		   }}
                 >Another match</button>

               </>
           )
       }

       </div>
     );

 }

 export default LayoutGuesses;
