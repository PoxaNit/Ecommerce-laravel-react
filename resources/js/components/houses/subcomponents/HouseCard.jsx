import React from "react";
import HousesContext from "../../../contexts/HousesContext.jsx";

 function HouseCard ({house = {}}) {

     const {
       setShowHouseDetails,
       setHouseInDetails
     } = React.useContext(HousesContext);



     const seeDetails = React.useCallback(() => {

         setShowHouseDetails(true);

         setHouseInDetails(house);

     }, []);

     return (
       <li onClick={() => seeDetails()}>

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
