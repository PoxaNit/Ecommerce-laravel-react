import React from "react";
import Horacio from "./Horacio.jsx";

 function Top ({
   closeGameHub = () => {}
 }) {

     return (
       <header>
         <section>
           <button onClick={() => closeGameHub()}>Close</button>
         </section>

         <section>
           <Horacio
             message="Hello, I'm Horacio! Choose a game to play!"
             expression="horacio_opened_mouth"
           />
         </section>

       </header>
     );

 }

 export default Top;
