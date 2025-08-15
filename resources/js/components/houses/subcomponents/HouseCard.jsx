import React from "react";
import HousesContext from "../../../contexts/HousesContext.jsx";

 function HouseCard ({house = {}}) {

     const {
       setShowHouseDetails,
       setHouseInDetails,
       houseInDetails
     } = React.useContext(HousesContext);

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
