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

     const startTimeInput = React.useRef(null);

     const endTimeInput = React.useRef(null);

     const messageP = React.useRef(null);

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

	 <h2>Date Format: YYYY-MM-DD HH:MM:SS</h2>

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

         <label htmlFor="start">Starts at (optional):</label>

         <input type="datetime" id="start" ref={startTimeInput}/>

         <label htmlFor="end">Ends at:</label>

         <input type="datetime" id="end" ref={endTimeInput}/>

         <button
           onClick={() => {

	       const endDate = "" + endTimeInput.current.value;
               const startDate = "" + startTimeInput.current.value;
               const regex = /[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/;
console.log("input dates: ", endDate, startDate)

	       if (endDate && regex.test(endDate)) {

                   if (startDate) {

                       if (startDate.test(startDate)) {

                           aplyDiscount(token, product.id, percentInputRef.current.value, startDate, endDate)

                       }

                       return;

                   }

                   aplyDiscount(token, product.id, percentInputRef.current.value, startTimeInput.current.value, endTimeInput.current.value)

	       } else {

                   messageP.current.value = "Incorrect Date Format!";

               }

           }}
         >Aply Discount</button>

         <p ref={messageP}></p>

       </>
     );

 }

 export default DiscountInterface;
