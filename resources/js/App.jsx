import React from "react";
import ReactDOM from "react-dom/client";
import Hub from "./components/hub/Hub.jsx";

 function App () {
     return (
       <>

         <Hub/>

       </>
     );
 }


 const root = ReactDOM.createRoot(document.getElementById("root"));

 root.render(<App/>);
