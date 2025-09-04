import React from "react";
import Guess_the_number from "../games/guess_the_number/Guess_the_number.jsx";
import GameContext from "../../../contexts/GameContext.jsx";

 function DisplayGame () {

     const {
       gameOnDisplay
     } = React.useContext(GameContext);

     switch (gameOnDisplay.name.toLowerCase()) {
       case "guess the number":
         return <Guess_the_number />
         break;
     }

 }

 export default DisplayGame;
