import React from "react";
import GuessContext from "../game_contexts/GuessContext.jsx";
import Horacio from "../../../components/Horacio.jsx";

 function Introduction () {

     const {
       setIntroduction,
       setGameOnDisplay,
       setConfiguration
     } = React.useContext(GuessContext);

     const introMessage =
`Hello, I'm Horacio!

 A secret number will be generated randomly, \
\ and we must guess what is that number.
`;

     const configurate = React.useCallback(() => {

         setIntroduction(false);

         setConfiguration(true);

     }, []);

     return (
       <div>

         <Horacio
           message={introMessage}
         />

         <button onClick={() => setGameOnDisplay(null)}
         >Leave game</button>

         <button onClick={() => configurate()}>Continue</button>

       </div>
     );

 }

 export default Introduction;
