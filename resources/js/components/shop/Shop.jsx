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
import ProductCategoryFilter from "./subcomponents/ProductCategoryFilter.jsx";

 function Shop ({closeShop = () => {}}) {

     const { token, userId } = React.useContext(AuthContext);

     // Keep all products became from backend in this component and children
     const [products, setProducts] = React.useState({});

     // Shows the ProductCategoryFilter component
     const [showCategoryFilter, setShowCategoryFilter] = React.useState(false);

     const [showProductDetails, setShowProductDetails] = React.useState(false);

     // Keeps the product that the user is seeing in details
     const [productInDetails, setProductInDetails] = React.useState({});


     // Keeps the products that the user has added to cart
     const [cart, setCart] = React.useState([]);

     const [showCart, setShowCart] = React.useState(false);

     const [showOptions, setShowOptions] = React.useState(false);

     const [showCheckout, setShowCheckout] = React.useState(false);



     // Allow the ProductDetais component to make conditional renderization depending on the parent component who called it
     const [parentCallerProductDetails, setParentCallerProductDetails] = React.useState("Shop");



     const [productListOnDisplay, setProductListOnDisplay] = React.useState({});

   // Defines if the products list is filtered or not
     const [productListFiltered, setProductListFiltered] = React.useState(false);




     /* Depends on the 'productListFiltered' state.
      * When if the product list is filtered, it must be verified if categoryFilter is not a empty string.
      * If not, then catch the content in this to see which is the category that the user is searching.
     */ const [categoryFilter, setCategoryFilter] = React.useState("");

     const [subCategoryFilter, setSubCategoryFilter] = React.useState("");

     // Depends on the productListFiltered, keeps the name of a product that the user has searched
     const [nameFilter, setNameFilter] = React.useState("");


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


     const viewProduct = React.useCallback((cartItem, parentCaller) => {

         setProductInDetails(cartItem);

         setParentCallerProductDetails(parentCaller);

         setShowProductDetails(true);

     }, []);







   // Filter logic
     React.useEffect(() => {

   // Note that if categoryFilter is active it's because the user filtered all products of some primary category

         if (productListFiltered) {

             if (!nameFilter && categoryFilter) {

                 const productsFilteredByCategory = products.filter(product => product.categories.category === categoryFilter);

                 setProductListOnDisplay(productsFilteredByCategory);

             } else if (!subCategoryFilter && !categoryFilter && nameFilter) {

                 const productsFilteredByName = products.filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()));

                 setProductListOnDisplay(productsFilteredByName);

             } else if (!subCategoryFilter && nameFilter && categoryFilter) {

                 const productsFilteredByCategory = productListOnDisplay.filter(p => p.categories.category === categoryFilter);

                 const productsFilteredByNameAfterCategoryFilter = productsFilteredByCategory.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()));

                 setProductListOnDisplay(productsFilteredByNameAfterCategoryFilter);

             } else if (!categoryFilter && subCategoryFilter && !nameFilter) {

                 const productsFilteredBySubCategory = products.filter(p => p.categories.subcategory === subCategoryFilter);

                 setProductListOnDisplay(productsFilteredBySubCategory);

             } else if (!categoryFilter && subCategoryFilter && nameFilter) {

                 const productsFilteredBySubCategory = productListOnDisplay.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()));

                 const filteredByName = productsFilteredBySubCategory.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()));

                 setProductListOnDisplay(filteredByName);

             } else {

                 setProductListOnDisplay(products);

             }

         } else {

             setProductListOnDisplay(products);

         }

     }, [products, productListFiltered, categoryFilter, nameFilter, subCategoryFilter]);






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

             <Cart cartItems={cart} showCart={setShowCart} />

           </ShopContext.Provider>

         );

     } else if (showOptions) {

         return (
           <ShopContext.Provider value={{
             setNameFilter
           }}>

             <Options
                  showOptions={setShowOptions}
                  showCart={setShowCart}
                  showCheckout={setShowCheckout}
                  showCategoryFilter={setShowCategoryFilter}
                />

           </ShopContext.Provider>);

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

     } else if (showCategoryFilter) {

         return (
           <ShopContext.Provider value={{
             products,
             setProductListOnDisplay,
             setCategoryFilter,
             setSubCategoryFilter,
             setProductListFiltered
           }}>

             <ProductCategoryFilter showThisComponent={setShowCategoryFilter} />

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
         setParentCallerProductDetails,
         productListOnDisplay,
         setProductListOnDisplay,
         productListFiltered,
         setProductListFiltered,
         categoryFilter,
         setCategoryFilter,
         nameFilter,
         setNameFilter,
         subCategoryFilter
       }}>


           <Top closeShop={closeShop} />

           <ProductList />


       </ShopContext.Provider>

     );

 }

 export default Shop;
