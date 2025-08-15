import React from "react";
import getAllHouses from "../../functions/getAllHouses.jsx";
import HouseDetails from "./subcomponents/HouseDetails.jsx";
import HousesContext from "../../contexts/HousesContext.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import Top from "./subcomponents/Top.jsx";
import Filters from "./subcomponents/Filters.jsx";
import Bottom from "./subcomponents/Bottom.jsx";

 function Houses ({showThisComponent = () => {}}) {


     const {
            userId,
            token
           } = React.useContext(AuthContext);

     const [allHouses, setAllHouses] = React.useState([]);
     const [housesOnDisplay, setHousesOnDisplay] = React.useState([]);

     const [showHouseDetails, setShowHouseDetails] = React.useState(false);
     const [houseInDetails, setHouseInDetails] = React.useState({});


     const keepAllHouses = React.useCallback(async () => {

         if (allHouses.length) return null;

         const houses = await getAllHouses(userId, token);

         setAllHouses(houses);

         setHousesOnDisplay(houses);

     }, [allHouses]);


     React.useEffect(() => {

             keepAllHouses();

     }, [allHouses]);

     return (
       <HousesContext.Provider value={{
         allHouses,
         setAllHouses,
         housesOnDisplay,
         setHousesOnDisplay,
         setShowHouseDetails,
         houseInDetails,
         setHouseInDetails
       }}>

         {

             showHouseDetails ? (

                 <HouseDetails showThisComponent={setShowHouseDetails}/>

             ) : (
                  <>
                    <Top showHouses={showThisComponent}/>

                    <Filters/>

                    <Bottom/>
                 </>
                )

         }

       </HousesContext.Provider>
     );

 }


 export default Houses;
