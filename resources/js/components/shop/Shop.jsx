import React from "react";
import ShopContext from "../../contexts/ShopContext.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import ProductDetails from "./subcomponents/ProductDetails.jsx";
import ProductList from "./subcomponents/ProductList.jsx";
import Top from "./subcomponents/Top.jsx";
import getProducts from "../../functions/getProducts.jsx";
import Cart from "./subcomponents/Cart.jsx";
import getCart from "../../functions/getCart.jsx";
import Options from "./subcomponents/Options.jsx";
import Checkout from "./subcomponents/Checkout.jsx";

 function Shop ({closeShop = () => {}}) {

     // Keep all products became from backend in this component and children
     const [products, setProducts] = React.useState({});

     const [showProductDetails, setShowProductDetails] = React.useState(false);

     // Keeps the product that the user is seeing in details
     const [productInDetails, setProductInDetails] = React.useState({});


     // Keeps the products that the user has added to cart
     const [cart, setCart] = React.useState([]);

     const [showCart, setShowCart] = React.useState(false);

     const [showOptions, setShowOptions] = React.useState(false);

     const [showCheckout, setShowCheckout] = React.useState(false);

     const { token, userId } = React.useContext(AuthContext);

localStorage.removeItem("cart");
     const storeProducts = React.useCallback(async () => {

              const storedProducts = await getProducts(token);

              setProducts(storedProducts); // Provide the products to children of this component

     }, []);


     const storeCart = React.useCallback(async () => {

         const cartProducts = await getCart(token, userId);

         setCart(cartProducts); // Provide the user cart state to the children components

     }, []);


     const executeUseEffect = React.useRef(true);

     React.useEffect(() => {

         if (executeUseEffect.current) {

             storeProducts();

             storeCart();

             executeUseEffect.current = false;

         }

     }, []);



     // Allow the ProductDetais component to make conditional rendering depending on the parent component who called it
     const [parentCallerProductDetails, setParentCallerProductDetails] = React.useState("Shop");

     const viewProduct = React.useCallback((cartItem, parentCaller) => {

         setProductInDetails(cartItem);

         setParentCallerProductDetails(parentCaller);

         setShowProductDetails(true);

     }, []);




     if (showProductDetails) { // Note that this as first condition let the user remain in the Cart component after close the ProductDetails clicked in the cart items list

       return (
           <ShopContext.Provider value={{
             setParentCallerProductDetails,
             productInDetails,
             setCart,
             setShowProductDetails,
             setProductInDetails
           }}>
              <ProductDetails
                   product={productInDetails}
                   showDetails={setShowProductDetails}
                   parentCaller={parentCallerProductDetails}
              />
           </ShopContext.Provider>
         );

     } else if (showCart) {

         return (
           <ShopContext.Provider value={{
             viewProduct,
             setCart,
             setShowCart,
             setShowCheckout
           }}>

             <Cart cartItems={cart} showCart={setShowCart} />;

           </ShopContext.Provider>

         );

     } else if (showOptions) {

         return <Options
                  showOptions={setShowOptions}
                  showCart={setShowCart}
                  showCheckout={setShowCheckout}
                />;

     } else if (showCheckout) {

         return (
           <ShopContext.Provider value={{
             setShowCart,
             setShowCheckout,
             cart,
             setCart,
             setProducts
           }}>

             <Checkout />

           </ShopContext.Provider>
         );

     }


     return (

       <ShopContext.Provider value={{
         products,
         setProducts,
         productInDetails,
         setProductInDetails,
         viewProduct,
         cart,
         setCart,
         showCart,
         setShowCart,
         showOptions,
         setShowOptions,
         showCheckout,
         setShowCheckout,
         setParentCallerProductDetails
       }}>


           <Top closeShop={closeShop} />

           <ProductList />


       </ShopContext.Provider>

     );

 }

 export default Shop;
