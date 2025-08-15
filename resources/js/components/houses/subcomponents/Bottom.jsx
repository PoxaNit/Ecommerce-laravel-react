import React from "react";
import HouseCard from "./HouseCard.jsx";
import HousesContext from "../../../contexts/HousesContext.jsx";

 function Bottom () {

     const {
       housesOnDisplay
     } = React.useContext(HousesContext);

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
