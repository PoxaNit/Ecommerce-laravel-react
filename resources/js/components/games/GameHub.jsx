import React from "react";
import Horacio from "./components/Horacio.jsx";
import Top from "./components/Top.jsx";
import getAllGames from "../../functions/getAllGames.jsx";
import GameList from "./components/GameList.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import GameContext from "../../contexts/GameContext.jsx";
import DisplayGame from "./components/DisplayGame.jsx";
import GameDetails from "./components/GameDetails.jsx";

 function GameHub ({showThisComponent = () => {}}) {

     const {
       token
     } = React.useContext(AuthContext);

     const [allGames, setAllGames] = React.useState([]);
     const [gameInDetails, setGameInDetails] = React.useState(null);

   // Game that the user is actually playing
     const [gameOnDisplay, setGameOnDisplay] = React.useState(null);

     const keepGames = React.useCallback(async () => {

         const games = await getAllGames(token);

         setAllGames(games);

     }, []);



     React.useEffect(() => {

         keepGames();

     }, []);



     return (
       <GameContext.Provider value={{
         allGames,
         setAllGames,
         gameInDetails,
         setGameInDetails,
         gameOnDisplay,
         setGameOnDisplay
       }}>

         { (!gameInDetails && !gameOnDisplay) && (

           <>

             <Top closeGameHub={() => showThisComponent(false)} />

             <GameList games={allGames}/>

           </>

         )}

         {

           (gameInDetails) && (<GameDetails />)

         }

         {

           (gameOnDisplay) && (<DisplayGame />)

         }

       </GameContext.Provider>
     );

 }

 export default GameHub;
