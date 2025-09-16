import React from "react";
import QuantityPainel from "./QuantityPainel.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import removeItemFromCart from "../../../functions/removeItemFromCart.jsx";
import addItemToCart from "../../../functions/addItemToCart.jsx";
import QuantityAddToCart from "./QuantityAddToCart";
import HubContext from "../../../contexts/HubContext.jsx";
import DiscountInterface from "./DiscountInterface.jsx";

 function ProductDetails ({
   product = {},
   showDetails = () => {},
   parentCaller = "Shop",
 }) {

     const {
       adminMode
     } = React.useContext(HubContext);

     const [showQuantityPainel, setShowQuantityPainel] = React.useState(false);

     const [showQuantityAddToCart, setShowQuantityAddToCart] = React.useState(false);

     const { userId, token } = React.useContext(AuthContext);

     const { setParentCallerProductDetails } = React.useContext(ShopContext);

     const [showDiscountInterface, setShowDiscountInterface] = React.useState(false);

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

React.useEffect(() => {
console.log(`showDiscountInterface state has changed!`)
}, [showDiscountInterface])

     if (showDiscountInterface) {

         return <DiscountInterface product={product} showThisComponent={setShowDiscountInterface}/>;

     }


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

             {(parentCaller === "Shop" && product.is_active) && <button onClick={() => setShowQuantityAddToCart(true)}>Add to cart</button> }

             {parentCaller === "Cart" && <button onClick={() => setShowQuantityPainel(true)}>Remove from cart</button>}

             {adminMode && <button
               onClick={() => setShowDiscountInterface(true)}
             >Aply Discount</button>}

             {adminMode && <button>Edit Product</button>}

             {adminMode && <button>Delete Product</button>}

           </section>

         </main>

       </>
     );

 }

 export default ProductDetails;
