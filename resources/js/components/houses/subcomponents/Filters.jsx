import React from "react";
import HousesContext from "../../../contexts/HousesContext.jsx";

 function Filters () {

     const {
            allHouses,
            setHousesOnDisplay
           } = React.useContext(HousesContext);

     const filterHouses = React.useCallback(function (filter = "") {

         if (filter === "all") {

             setHousesOnDisplay(allHouses);

             return null;

         }

         let belongs; // Keeps if house belongs or not to user

         if (filter === "belongs") belongs = true;

         if (filter === "notBelongs") belongs = false;


         const filteredHouses =
               allHouses.filter(house => {
                   return house.belongs_to_user === belongs;
               });

         setHousesOnDisplay(filteredHouses);

console.log(`Filters: allHouses: ${JSON.stringify(allHouses)}`)
     }, [allHouses]);

     return (
       <div>

         <button onClick={() => filterHouses("all")}
         >All</button>

         <button onClick={() => filterHouses("belongs")}
         >My Houses</button>

         <button onClick={() => filterHouses("notBelongs")}
         >Not Owned</button>

       </div>
     );

 }

 export default Filters;
