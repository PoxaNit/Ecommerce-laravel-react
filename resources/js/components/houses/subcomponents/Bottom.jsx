import React from "react";
import HouseCard from "./HouseCard.jsx";
import HousesContext from "../../../contexts/HousesContext.jsx";

 function Bottom () {

     const {
       housesOnDisplay
     } = React.useContext(HousesContext);
React.useEffect(() => console.log(`Bottom: housesOnDisplay: ${JSON.stringify(housesOnDisplay)}`), [housesOnDisplay]);
     return (
       <div>

         <ul>
           {

               housesOnDisplay.map(house => {

                   return (
                           <HouseCard
                            house={house}
                           />
                          );

               })

           }
         </ul>

       </div>
     );

 }


 export default Bottom;
