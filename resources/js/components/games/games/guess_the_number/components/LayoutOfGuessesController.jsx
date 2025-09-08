import React from "react";
import LayoutOfGuesses from "./LayoutOfGuesses.jsx";
import GuessContext from "../game_contexts/GuessContext.jsx";
import headsOrTails from "../../../../../functions/headsOrTails.jsx";
import getHoracioGuess from "../../../../../functions/getHoracioGuess.jsx";
import sendMatchResults from "../../../../../functions/sendMatchResults.jsx";
import AuthContext from "../../../../../contexts/AuthContext.jsx";
import GameContext from "../../../../../contexts/GameContext.jsx";
import getRandomNumber from "../../../../../functions/getRandomNumber.jsx";

 function LayoutOfGuessesController ({multiplayer = false}) {

     const {
       numberInterval,
       gameDifficulty,
       generatedNumber
     } = React.useContext(GuessContext);

     const {
       userId,
       token
     } = React.useContext(AuthContext);

     const {
       gameOnDisplay
     } = React.useContext(GameContext);

     const [choosenNumber, setChoosenNumber] = React.useState(null);

     const [showInputNumber, setShowInputNumber] = React.useState(false);

     const [playerInTurn, setPlayerInTurn] = React.useState(null);

     const horacioGuessMinMax = React.useRef({
       min: 1,
       max: numberInterval
     });

     const [gameMessage, setGameMessage] =
       React.useState({
         display: false,
         message: ""
       });

     const [oldGameMessage, setOldGameMessage] =
       React.useState({
         display: false,
         message: ""
       });

     const [playerMessage, setPlayerMessage] =
       React.useState({
         display: false,
         message: ""
       });

     const [horacioMessage, setHoracioMessage] =
       React.useState({
         display: false,
         message: "",
         expression: ""
       });

     const [waitMessage, setWaitMessage] =
       React.useState({
         display: false,
         message: ""
       });

     const [showEndScreen, setShowEndScreen] =
       React.useState({
         display: false,
         message: ""
       });


     const generateResponse = React.useCallback(number => {


         if (number > generatedNumber) {

             if (number <= horacioGuessMinMax.current.max) {

                const n = horacioGuessMinMax.current.max = (parseInt(number) - 1);

             }

             return {
               success: false,
	       message: `${number} is greater than the secret number!`
             };

         }

         if (number < generatedNumber) {

             if (number >= horacioGuessMinMax.current.min) {

                 const n = horacioGuessMinMax.current.min = (parseInt(number) + 1);

             }

             return {
               success: false,
	       message: `${number} is less than the secret number!`
             };
         }

         if (number == generatedNumber) return {
           success: true,
	   message: `The secret number is ${number}!`
         };

     }, []);


     const [playLoop, setPlayLoop] = React.useState(false);

     const gameLoop = React.useCallback(() => {

         if (!playLoop) return null;

             setShowInputNumber(false);

             setHoracioMessage({display: false});

             setGameMessage({display: false});

             setOldGameMessage({display: false});

           // This point requires that the user has already choosen the number previously

             const playerResponse = generateResponse(choosenNumber);

	     if (playerResponse.success) {

		 setShowEndScreen({
		   display: true,
		   message: `Congratulations, Player! The secret number is ${choosenNumber}!`
		 });

		 (async function () {

		     const gamePoints = gameOnDisplay.rewards.points;

		     const generatedPoints = getRandomNumber(
		       gamePoints.min,
		       gamePoints.max
		     );

		     const gameMoney = gameOnDisplay.rewards.money;

		     const generatedMoney = getRandomNumber(
		       gameMoney.min,
		       gameMoney.max,
		       true
		     );

		     await sendMatchResults(
		       userId,
		       gameOnDisplay.id,
		       "victory",
		       generatedPoints,
		       generatedMoney,
		       token
		     );

		 })();

                 won = true;

	     } else {

		 setOldGameMessage({
                   display: true,
		   message: `Nice try! But ${playerResponse.message}`
                 });

                 const horacioGuess = getHoracioGuess(gameDifficulty, numberInterval, horacioGuessMinMax.current.min, horacioGuessMinMax.current.max, generatedNumber);

		 const horacioResponse = generateResponse(horacioGuess);

                 setTimeout(() => {

		     setHoracioMessage({
		       display: true,
		       message: `I choose the number ${horacioGuess}`
		     });

                     setTimeout(() => {

		         if (horacioResponse.success) {

			     setHoracioMessage({display: false});

			     setOldGameMessage({display: false});

		             setShowEndScreen({
		               display: true,
		               message: `Congratulations, Horacio! ${horacioResponse.message}`
		             });

		             (async function () {

		                 await sendMatchResults(
		                   userId,
		                   gameOnDisplay.id,
		                   "defeat",
		                   0,
		                   (0).toFixed(2),
		                   token
		                 );

		             })();


		         } else {

		             setGameMessage({
			       display: true,
			       message: `Nice try! But ${horacioResponse.message}`
			     });

			     setTimeout(() => {

			         setShowInputNumber(true);

			     }, 800);

		         }

		     }, 1500);

		 }, 1500);

	     }

     }, [choosenNumber]);



     const startGame = React.useCallback(() => {

         const whoBegins = headsOrTails();

         setPlayerInTurn(whoBegins);

         setGameMessage({
           display: true,
           message: "Match started!"
         });         


         setTimeout(() => {

             setGameMessage({display: false});

             if (whoBegins === "player1") {

                 setHoracioMessage({
                   display: true,
                   message: "You start! Type a number."
                 });

                 setTimeout(() => {

                     setShowInputNumber(true);

                 }, 500);

             } else {

                 setHoracioMessage({
                   display: true,
                   message: "I will start!"
                 });

                 setTimeout(() => {

                     const horacioGuess = getHoracioGuess(gameDifficulty, numberInterval, 1, numberInterval, generatedNumber);

                     setHoracioMessage({
                       display: true,
		       message: `I choose the number ${horacioGuess}`
                     });

                     setTimeout(() => {

			 const response = generateResponse(horacioGuess);

			 if (!response.success) {

			     setHoracioMessage({display: false});

			     setGameMessage({
			       display: true,
			       message: `Nice try! but ${response.message}`
			     });

                             setTimeout(() => {

			         setShowInputNumber(true);

			     }, 1500);

			 } else {

			     setGameMessage({
			       display: true,
			       message: `Congratulations, Horacio! The secret number is ${horacioGuess}`
			     });


		             (async function () {

		                 await sendMatchResults(
		                   userId,
		                   gameOnDisplay.id,
		                   "defeat",
		                   0,
		                   (0).toFixed(2),
		                   token
		                 );

		             })();

			 }

		     }, 1500);

                 }, 1500);

             }

         }, 1500);

     }, []);


     React.useEffect(() => {

         startGame();

     }, []);

     React.useEffect(() => {

         gameLoop();

     }, [choosenNumber]);

     return (
       <>
         <LayoutOfGuesses
           setChoosenNumber={setChoosenNumber}
           multiplayer={multiplayer}
           showInputNumber={showInputNumber}
           gameMessage={gameMessage}
           oldGameMessage={oldGameMessage}
           playerMessage={playerMessage}
           waitMessage={waitMessage}
           horacioMessage={horacioMessage}
           setPlayLoop={setPlayLoop}
           showEndScreen={showEndScreen}
         />
       </>
     );

 }

 export default LayoutOfGuessesController;
