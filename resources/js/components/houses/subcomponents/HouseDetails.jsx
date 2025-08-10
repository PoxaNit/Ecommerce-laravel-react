import React from "react";
import HousesContext from "../../../contexts/HousesContext.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import sellHouse from "../../../functions/sellHouse.jsx";
import HouseItemCard from "./HouseItemCard.jsx";
import HouseItemDetails from "./HouseItemDetails.jsx";

 function HouseDetails ({showThisComponent = () => {}}) {

     const {
       houseInDetails,
       setHouseInDetails
     } = React.useContext(HousesContext);

     const {
       userId,
       userBalance,
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

             showThisComponent(false);

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

                     <button>Buy this house</button>

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
