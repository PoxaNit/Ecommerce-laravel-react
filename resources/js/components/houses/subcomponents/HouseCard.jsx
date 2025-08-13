import React from "react";
import HousesContext from "../../../contexts/HousesContext.jsx";

 function HouseCard ({house = {}}) {
console.log(`HouseCard: house: ${JSON.stringify(house)}`)

     const {
       setShowHouseDetails,
       setHouseInDetails,
       houseInDetails
     } = React.useContext(HousesContext);

React.useEffect(() => console.log(`houseInDetails: ${JSON.stringify(houseInDetails)}`), [houseInDetails])
/*
     const seeDetails = React.useCallback(() => {
console.log(`houseInDetails before: ${JSON.stringify(houseInDetails)}`)

         setHouseInDetails(house);
console.log(`houseInDetails after: ${JSON.stringify(houseInDetails)}`)

     }, [houseInDetails]);
*/
     React.useEffect(() => {

         if (houseInDetails?.house_id) {

             setShowHouseDetails(true);

         }

     }, [houseInDetails]);

     return (
       <li onClick={() => setHouseInDetails(house)}>

         <img src={house.image_path} alt="house image"/>

         <strong>{house.name}</strong>

         {
           house.belongs_to_user ? (
               <p>Enter House</p>
           ) : (
               <p>View House</p>
           )
         }

       </li>
     );

 }


 export default HouseCard;
