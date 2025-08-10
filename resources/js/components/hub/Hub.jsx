import React from "react";
import ReactDOM from "react-dom/client";
import Account from "../account/Account.jsx";
import Shop from "../shop/Shop.jsx";
import Houses from "../houses/Houses.jsx";

 function Hub () {

     const [showAccount, setShowAccount] = React.useState(false);
     const [showShop, setShowShop] = React.useState(false);
     const [showHouses, setShowHouses] = React.useState(false);


     if (showAccount) {

         return <Account setShow={setShowAccount} />;

     } else if (showShop) {

         return <Shop closeShop={() => setShowShop(false)} />;

     } else if (showHouses) {

         return <Houses showThisComponent={setShowHouses}/>;

     } else {

         return (

           <div>

               <h1>Hub</h1>

               <button onClick={() => setShowHouses(true)}>Navigate to Home</button>

               <button onClick={() => setShowShop(true)}>Navigate to Store</button>

               <button onClick={() => setShowAccount(true)}>account</button>

           </div>

         );

     }

 }


 export default Hub;
