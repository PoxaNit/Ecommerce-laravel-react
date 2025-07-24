import React from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import getProducts from "../../../functions/getProducts.jsx";

 function Checkout () {

     const [message, setMessage] = React.useState("");
     const [purchaseButtonDisabled, setPurchaseButtonDisabled] = React.useState(false);

     const { userId, token } = React.useContext(AuthContext);

     const { setProducts, setCart, cart, setShowCheckout, setShowCart } = React.useContext(ShopContext);



     const executeEffect = React.useRef(true);

     React.useEffect(() => {

         if (executeEffect.current) {

             if (!cart[0]) {

                 setMessage("There are no items in your cart!");

                 setPurchaseButtonDisabled(true);

             }

             executeEffect.current = false;

         }

     }, []);

     const makePurchase = React.useCallback(async () => {

         setMessage("Purchasing, wait...");

         if (!cart[0]) {

             setMessage("There are no items in your cart!");

             return null;

         }

         const response = await fetch(`http://localhost:8000/api/users/${userId}/checkout`, {
           headers:{
             Authorization:`Bearer ${token}`
           },
           method:"GET"
         });

         const json = await response.json();

         setCart([]);

         localStorage.removeItem("products");

         const products = await getProducts(token);

         setProducts(products);

         setMessage("Purchase made!");

     }, [cart]);

     return (
       <>

         <button onClick={() => setShowCheckout(false)}>Close</button>

         <h1>Checkout</h1>

         <button onClick={() => {

             setShowCart(true);

             setShowCheckout(false);

         }}>View cart</button>

         <button disabled={purchaseButtonDisabled} onClick={() => makePurchase()}>Make Purchase</button>

         <p>{message}</p>

       </>
     );

 }

 export default Checkout;
