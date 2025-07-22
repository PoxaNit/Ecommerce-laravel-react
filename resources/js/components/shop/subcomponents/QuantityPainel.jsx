import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";

 function QuantityPainel ({
   totalQuantity = 0,
   finish = () => {},
   showPainel = () => {}
 }) {

     const { productInDetails, setCart, setShowProductDetails, setProductInDetails } = React.useContext(ShopContext);
     const { userId, token } = React.useContext(AuthContext);

     const [quantitySelected, setQuantitySelected] = React.useState(0);
     const [increaseButtonDisabled, setIncreaseButtonDisabled] = React.useState(false);
     const [decreaseButtonDisabled, setDecreaseButtonDisabled] = React.useState(true);

     const decrease = React.useCallback(() => {

         if (quantitySelected === 0) {

             setDecreaseButtonDisabled(true);

         } else {setQuantitySelected(quantitySelected - 1)}

         if (increaseButtonDisabled)

             setIncreaseButtonDisabled(false);

     }, [quantitySelected, increaseButtonDisabled]);


     const increase = React.useCallback(() => {

         if (quantitySelected === totalQuantity) {

             setIncreaseButtonDisabled(true);

         } else {setQuantitySelected(quantitySelected + 1)}


         if (decreaseButtonDisabled)

             setDecreaseButtonDisabled(false);


     }, [quantitySelected, decreaseButtonDisabled]);


     const storeUpdatedCart = React.useCallback(async () => {

         const updatedCart = await finish(
                             productInDetails.product.id,
                             quantitySelected,
                             userId,
                             token);

         console.log(`new cart: ${JSON.stringify(updatedCart)}`);

         setCart(updatedCart);

         setProductInDetails({});

         setShowProductDetails(false);

     }, [quantitySelected]);

     return (
       <div>

         <button onClick={() => showPainel(false)}>Close painel</button>

         <section>

           <p>{quantitySelected}</p>

           <strong>of</strong>

           <p>{totalQuantity}</p>

         </section>



         <section>

           <button disabled={decreaseButtonDisabled} onClick={() => decrease()}>-</button>
           <button disabled={increaseButtonDisabled} onClick={() => increase()}>+</button>

         </section>


         <section>

           <button onClick={() => storeUpdatedCart()}>Finish</button>

         </section>


       </div>
     );

 }

 export default QuantityPainel;
