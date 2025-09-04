import React from "react";
import GuessContext from "./game_contexts/GuessContext.jsx";
import Introduction from "./components/Introduction.jsx";
import Configuration from "./components/Configuration.jsx";
import StartGame from "./components/StartGame.jsx";

 function Guess_the_number () {

   // Show Introduction component
     const [introduction, setIntroduction] = React.useState(true);


   // Show Configuration component
     const [configuration, setConfiguration] = React.useState(false);
       const [gameDifficulty, setGameDifficulty] = React.useState("normal");
       const [numberInterval, setNumberInterval] = React.useState(100);


   // Show StartGame component
     const [startGame, setStartGame] = React.useState(false);
       const [generatedNumber, setGeneratedNumber] = React.useState(0);
     // Keep the player number: 1 or 2 (in this game, player 1 starts the game)
       const [playerN, setPlayerN] = React.useState(0);

     return (
       <GuessContext.Provider value={{
         setIntroduction,
         setConfiguration,
         gameDifficulty,
         setGameDifficulty,
         numberInterval,
         setNumberInterval,
         generatedNumber,
         setGeneratedNumber,
         setStartGame,
         playerN,
         setPlayerN
       }}>


         {
           introduction && <Introduction/>
         }

         {
           configuration && <Configuration/>
         }

         {
           startGame && <StartGame/>
         }

       </GuessContext.Provider>
     );

 }

 export default Guess_the_number;
