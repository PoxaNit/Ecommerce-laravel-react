import React from "react";
import ReactDOM from "react-dom/client";
import Account from "../account/Account.jsx";

 function Hub () {

     const [showAccount, setShowAccount] = React.useState(false);

     if (showAccount) {

         return <Account setShow={setShowAccount} />;

     } else {

         return (

           <div>

               <h1>Hub</h1>

               <button>Navigate to Home</button>

               <button>Navigate to Store</button>

               <button onClick={() => setShowAccount(true)}>account</button>

           </div>

         );

     }

 }


 export default Hub;
