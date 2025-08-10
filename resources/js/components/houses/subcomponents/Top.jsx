import React from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";

 function Top ({showHouses}) {

     const { userBalance } = React.useContext(AuthContext);

     return (
       <header>

         <button onClick={() => showHouses(false)}>Close</button>

         <strong>Balance: {userBalance}</strong>

       </header>
     );

 }

 export default Top;
