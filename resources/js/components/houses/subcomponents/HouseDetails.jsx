import React from "react";
import HousesContext from "../../../contexts/HousesContext.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import sellHouse from "../../../functions/sellHouse.jsx";
import buyHouse from "../../../functions/buyHouse.jsx";
import HouseItemCard from "./HouseItemCard.jsx";
import HouseItemDetails from "./HouseItemDetails.jsx";
import activeHouse from "../../../functions/activeHouse.jsx";

 function HouseDetails ({showThisComponent = () => {}}) {

     const {
       houseInDetails,
       setHouseInDetails,
       setAllHouses,
       setHousesOnDisplay
     } = React.useContext(HousesContext);

     const {
       userId,
       userBalance,
       setUserBalance,
       token
     } = React.useContext(AuthContext);


     const [errorMessage, setErrorMessage] = React.useState("");


     // Items here are the products purchased by user
     const [showItems, setShowItems] = React.useState(false);


     // Also keeps the item in details, so when it occurs, this keeps an array
     const [showItemDetails, setShowItemDetails] = React.useState(false);


     const sellThisHouse = React.useCallback(async () => {

         const response = await sellHouse(userId, houseInDetails.house_id, token);

         if (response.success) {

             setHouseInDetails({});

             setAllHouses(response.data);

             setHousesOnDisplay(response.data)

             showThisComponent(false);

             setUserBalance(response.balance);

         } else {

             setErrorMessage(response.message);

         };

     }, []);


     const buyThisHouse = React.useCallback(async () => {

         const response = await buyHouse(userId, houseInDetails.house_id, token);

         if (response.success) {

             setHouseInDetails({});

             setAllHouses(response.data);

             setHousesOnDisplay(response.data)

             showThisComponent(false);

             setUserBalance(response.balance);

         } else {

             setErrorMessage(response.message);

         };

     }, []);


     const activateOrNotThisHouse = React.useCallback(async (bool = true) => {

         const response = await activeHouse(userId, houseInDetails.house_id, bool, token);

         if (response.success) {

             const house = response.data.filter(h => h.house_id === houseInDetails.house_id);

             setAllHouses(response.data);

             setHousesOnDisplay(response.data)

             setHouseInDetails(house[0]);

             setErrorMessage("");

         } else {

             setErrorMessage(response.message);

         };


     }, []);

     const viewItems = React.useCallback(() => {

         setShowItems(true);

     }, [showItems]);


     return (!showItems && !showItemDetails) ? (
       <div>

         <header>

           <p>House ID:
             <strong>
               {houseInDetails.house_id}
             </strong>
           </p>

           {
            houseInDetails.belongs_to_user ? (
              <p>Owned</p>
            ) : <p>Not owned</p>
           }

           <button
            onClick={() => {

                setHouseInDetails({});

                showThisComponent(false);

            }}
           >Close</button>

           <strong>Balance: {userBalance}</strong>

         </header>

         <div>

           <img src={houseInDetails.image_path} alt="house image" />

           <strong>{houseInDetails.name}</strong>

           <p>{houseInDetails.description}</p>

           <p>Capacity (volume):
             <strong>
               {houseInDetails.capacity}
             </strong>
           </p>

           {

               houseInDetails.belongs_to_user ? (
                  <>
                     <p>Available space (volume):
                       <strong>
                         {houseInDetails.available_space}
                       </strong>
                     </p>

                     <p>Occupied space (volume):
                       <strong>
                         {houseInDetails.occupied_space}
                       </strong>
                     </p>

                     <p>Is active: <strong>{houseInDetails.is_active ? "yes" : "no"}</strong></p>

                     <button
                      onClick={() => activateOrNotThisHouse(!houseInDetails.is_active)}
                     >{houseInDetails.is_active ? "Disable" : "Enable"}
                     </button>

                     <button
                      onClick={() => sellThisHouse()}
                     >Sell this house</button>

                     <button onClick={() => viewItems()}>View items</button>

                     {errorMessage && <p>{errorMessage}</p>}
                  </>
                 )
               : (
                  <>
                     <p>Price:
                       <strong>
                         {houseInDetails.cost}
                       </strong>
                     </p>

                     <button onClick={() => buyThisHouse()}>Buy this house</button>

                     {errorMessage && <p>{errorMessage}</p>}

                  </>
                 )

           }

         </div>

       </div>
     ) : (
       <>
       {

         showItems && (

           <>

             <button onClick={() => {

                 setShowItems(false);

             }}>Close</button>

             <ul>
             {
               houseInDetails.itens.map(item => {

                   return (<HouseItemCard 
                            houseItem={item}
                            showItems={setShowItems}
                            showDetails={setShowItemDetails}
                          />);
                 })
             }
             </ul>

           </>)
       }



       {
           showItemDetails && (

                     <HouseItemDetails
                         showThisComponent={setShowItemDetails}
                         item={showItemDetails}
                         showItems={setShowItems}
                       />

           )

       }

     </>
     );

 }

 export default HouseDetails;
