import React from "react";
import ReactDOM from "react-dom/client";
import Account from "../account/Account.jsx";
import Shop from "../shop/Shop.jsx";

 function Hub () {

     const [showAccount, setShowAccount] = React.useState(false);

     const [showShop, setShowShop] = React.useState(false);

     if (showAccount) {

         return <Account setShow={setShowAccount} />;

     } else if (showShop) {

         return <Shop closeShop={() => setShowShop(false)} />;

     } else {

         return (

           <div>

               <h1>Hub</h1>

               <button>Navigate to Home</button>

               <button onClick={() => setShowShop(true)}>Navigate to Store</button>

               <button onClick={() => setShowAccount(true)}>account</button>

           </div>

         );

     }

 }


 export default Hub;
