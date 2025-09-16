import React from "react";
import ReactDOM from "react-dom/client";
import Account from "../account/Account.jsx";
import Shop from "../shop/Shop.jsx";
import Houses from "../houses/Houses.jsx";
import GameHub from "../games/GameHub.jsx";
import HubContext from "../../contexts/HubContext.jsx";

 function Hub () {

     const [showAccount, setShowAccount] = React.useState(false);
     const [showShop, setShowShop] = React.useState(false);
     const [showHouses, setShowHouses] = React.useState(false);
     const [showGames, setShowGames] = React.useState(false);

     const [adminMode, setAdminMode] = React.useState(false);

     if (showAccount) {

         return (
           <HubContext.Provider value={{
             adminMode,
             setAdminMode
           }}>

             <Account setShow={setShowAccount} />

           </HubContext.Provider>
         );

     } else if (showShop) {

         return (
           <HubContext.Provider value={{
             adminMode
           }}>

             <Shop closeShop={() => setShowShop(false)} />

           </HubContext.Provider>

         );

     } else if (showHouses) {

         return <Houses showThisComponent={setShowHouses}/>;

     } else if (showGames) {

         return <GameHub showThisComponent={setShowGames} />;

     } else {

         return (

           <div>

               <h1>Hub</h1>

               <button onClick={() => setShowHouses(true)}>Navigate to Home</button>

               <button onClick={() => setShowShop(true)}>Navigate to Store</button>

               <button onClick={() => setShowAccount(true)}>Account</button>

               <button onClick={() => setShowGames(true)}>Navigate to game hub</button>

           </div>

         );

     }

 }


 export default Hub;
