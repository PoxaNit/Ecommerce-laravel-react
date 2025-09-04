
 function headsOrTails () {

     const randN = Math.floor(Math.random() * 2) + 1;

     return randN === 1 ? "player1" : "player2";

 }

 export default headsOrTails;
