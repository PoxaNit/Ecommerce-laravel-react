import React from "react";
import QuantityPainel from "./QuantityPainel.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import removeItemFromCart from "../../../functions/removeItemFromCart.jsx";
import addItemToCart from "../../../functions/addItemToCart.jsx";
import QuantityAddToCart from "./QuantityAddToCart";

 function ProductDetails ({
   product = {},
   showDetails = () => {},
   parentCaller = "Shop",
 }) {

     const [showQuantityPainel, setShowQuantityPainel] = React.useState(false);

     const [showQuantityAddToCart, setShowQuantityAddToCart] = React.useState(false);

     const { userId, token } = React.useContext(AuthContext);

     const { setParentCallerProductDetails } = React.useContext(ShopContext);


     let quantity = 0;

     if (parentCaller === "Cart") {

         quantity = product?.quantity;

         product = product.product;

     } else {

         quantity = product.stock;

     }

     const close = React.useCallback(() => {

         setParentCallerProductDetails("Shop");

         showDetails(false);

     }, []);


     const addToCart = React.useCallback(async () => {

         const newCart = await addItemToCart(userId, product.id, token, quantity);

     }, []);


     return (
       <>

         {(parentCaller === "Cart" && showQuantityPainel) && <QuantityPainel totalQuantity={quantity} finish={removeItemFromCart} showPainel={setShowQuantityPainel}/> }
         {(parentCaller === "Shop" && showQuantityAddToCart) && <QuantityAddToCart totalQuantity={quantity} addToCart={addItemToCart} showThisComponent={setShowQuantityAddToCart}/> }

         <header>

           <button onClick={() => close()}>Close</button>

           <h1>{product.name}</h1>

           <img src={product.image_path} alt="product image" />

         </header>

         <main>

           <section>

             <p>{product.description}</p>

           </section>


           <section>

             <section>

               <strong>price</strong>

               <p>{product.price}</p>

             </section>

             <section>

               <strong>available</strong>

               <p>{product.is_active ? "yes" : "no"}</p>

             </section>

             <section>

               <strong>stock</strong>

               <p>{product.stock}</p>

             </section>

             {parentCaller === "Cart" && (

               <section>

                 <strong>quantity in cart</strong>

                 <p>{quantity}</p>

               </section>

             )}

           </section>

           <section>

             {parentCaller === "Shop" && <button onClick={() => setShowQuantityAddToCart(true)}>Add to cart</button> }

             {parentCaller === "Cart" && <button onClick={() => setShowQuantityPainel(true)}>Remove from cart</button>}

           </section>

         </main>

       </>
     );

 }

 export default ProductDetails;
