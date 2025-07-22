import React from "react";

 function Options ({
   showCart = () => {},
   showOptions = () => {},
   showCheckout = () => {}
 }) {

     const displayCart = React.useCallback(() => {

         showCart(true);

         showOptions(false);

     }, []);

     const displayCheckout = React.useCallback(() => {

         showCheckout(true);

         showOptions(false);

     }, []);


     return (
       <div>

         <button onClick={() => showOptions(false)}>Close</button>
         <button onClick={() => displayCart()}>View cart</button>
         <button onClick={() => displayCheckout()}>Checkout</button>

       </div>
     );

 }

 export default Options;
