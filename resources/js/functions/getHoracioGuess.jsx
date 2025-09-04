import getRandomNumber from "./getRandomNumber.jsx";

 function getHoracioGuess (
   difficulty = "normal",
   numberInterval = 100,

   /* Just in case when Horacio has to be "smart"*/
   min = 0,
   max = 0,

   generatedNumber // in case of horacio must to hit the secret number
 ) {

     let
       n,
       divideInHalf,
       hitTheCorrectNumber,
       optionsLeftInsideCondition
     ;

     switch (difficulty) {

       case "easy":
         return parseInt(getRandomNumber(min, max));
         break;

       case "normal":

         n = getRandomNumber(min, max);

         divideInHalf = getRandomNumber(1, 10) <= 3;

         hitTheCorrectNumber = getRandomNumber(1, 10) <= 3;

         optionsLeftInsideCondition = ((max - min) + 1) <= 3;

         if (optionsLeftInsideCondition && hitTheCorrectNumber) return parseInt(generatedNumber);

         if (divideInHalf) return parseInt((max + min) / 2);

         return parseInt(n);

         break;

       case "hard":

         n = getRandomNumber(min, max);

         divideInHalf = getRandomNumber(1, 10) <= 4;

         hitTheCorrectNumber = getRandomNumber(1, 10) <= 5;

         optionsLeftInsideCondition = ((max - min) + 1) <= 6;

         if (optionsLeftInsideCondition && hitTheCorrectNumber) return parseInt(generatedNumber);

         if (divideInHalf) return parseInt((max + min) / 2);

         return parseInt(n);

         break;

       default: return 0;

     }

 }

 export default getHoracioGuess;
