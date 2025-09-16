import React from "react";
import calculateDiscount from "../../../functions/calculateDiscount.jsx";
import aplyDiscount from "../../../functions/aplyDiscount.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";

 function DiscountInterface ({
   product = {},
   showThisComponent = () => {}
 }) {

     const {
       token
     } = React.useContext(AuthContext);

     const percentInputRef = React.useRef(null);

     const finalPriceInputRef = React.useRef(null);


     const percent = React.useRef(0);

     const finalPrice = React.useRef(0);

     const handlePercentChange = React.useCallback(() => {

         const n = parseFloat(percentInputRef.current.value.replace(",", ".")).toFixed(2);

         finalPriceInputRef.current.value =
          finalPrice.current =
           parseFloat(
            calculateDiscount(
             product.price,
             n
           )).toFixed(2);

     }, []);

     const handleFinalPriceChange = React.useCallback(() => {

         const n = parseFloat(finalPriceInputRef.current.value.replace(",", ".")).toFixed(2);

         percentInputRef.current.value =
          percent.current =
           parseFloat(calculateDiscount(
             product.price,
             0,
             n,
             "finalPrice"
           )).toFixed(2);

     }, []);

     return (
       <>

         <button onClick={() => showThisComponent(false)}>Close</button>

         <h1>Aply Discount</h1>

         <strong>Actual price: {product.price}</strong>

         <label htmlFor="discount_price">
           Price:
         </label>

         <input
           ref={finalPriceInputRef}
           id="discount_price"
           type="number"
           onChange={handleFinalPriceChange}
         />

         <label htmlFor="discount_percent">
           Percent (%):
         </label>

         <input
           ref={percentInputRef}
           id="discount_percent"
           type="number"
           onChange={handlePercentChange}
         />

         <button
           onClick={() => aplyDiscount(token, product.id, finalPrice.current.toFixed(2))}
         >Aply Discount</button>

       </>
     );

 }

 export default DiscountInterface;
