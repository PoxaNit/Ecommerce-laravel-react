import React from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import ProductCard from "./cards/ProductCard.jsx";
import CartContext from "../../../contexts/CartContext.jsx";
import clearCart from "../../../functions/clearCart.jsx";

 function Cart ({
   cartItems = [],
   showCart = () => {}
 }) {

     const { cart, token, userId } = React.useContext(AuthContext);

     const {
       setShowCart,
       setShowCheckout,
       setCart,
       setShowOptions,
       viewProduct
     } = React.useContext(ShopContext);


     const goToCheckout = React.useCallback(() => {


     }, []);





     const [quantityOfProducts, setQuantityOfProducts] = React.useState(0);
     const [totalPrice, setTotalPrice] = React.useState(0);

     const countCartItems = React.useCallback(() => {

         let quantity = 0;

         cartItems.forEach(item => quantity += item.quantity);

         setQuantityOfProducts(quantity);

     }, [cart]);


     const countPriceCartItems = React.useCallback(() => {

         let price = 0;

         cartItems.forEach(item => price += (item.product.price * item.quantity));

         setTotalPrice(parseFloat(price).toFixed(2));

     }, [cart]);



     React.useEffect(() => {

         countCartItems();

         countPriceCartItems();

     }, [cart]);

     return (
       <CartContext.Provider>

         <header>

           <button onClick={() => showCart(false)}>Close</button>

         </header>

         <main>

           <ul>{

             cartItems[0] ? (

             cartItems.map(item => {

                 return (
                   <li>
                      <ProductCard
                          name={item.product.name}
                          short_description={item.product.short_description}
                          price={item.product.price}
                          imageUrl={item.product.image_path}
                          stock={item.product.stock}
                          parentCallerProductDetails={"Cart"}
                          viewDetails={() => viewProduct(item, "Cart")}
                        />
                   </li>
                 );

             })) : (

                 <strong>There is no items in the cart...</strong>

             )

           }</ul>

         </main>

         <footer>



           <section>



             <section>

               <strong>Quantity of products</strong>

               <p>{quantityOfProducts}</p>

             </section>



             <section>

               <strong>total price</strong>

               <p>{totalPrice}</p>

             </section>



           </section>



           <section>

             <button onClick={() => {
                 clearCart(userId, token);
                 setCart([]);
                 setQuantityOfProducts(0);
                 setTotalPrice(0);
             }}>Remove all</button>

             <button onClick={() => {

                 setShowCheckout(true);

                 setShowCart(false);

             }}>Go to checkout</button>

           </section>



         </footer>

       </CartContext.Provider>
     );

 }

 export default Cart;
