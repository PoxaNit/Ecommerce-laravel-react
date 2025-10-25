import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";
import HubContext from "../../../contexts/HubContext.jsx";
import ManageProductCategories from "./ManageProductCategories.jsx";

 function Options ({
   showCart = () => {},
   showOptions = () => {},
   showCheckout = () => {},
   showCategoryFilter = () => {},
   showCreateProduct = () => {},
   showCategoriesManager = () => {}
 }) {

     const { setNameFilter } = React.useContext(ShopContext);

     const { adminMode } = React.useContext(HubContext);

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

         <button onClick={() => {setNameFilter(""); showOptions(false)}}>Close</button> {/*Note that the "setNameFilter("") is to update the useEffect of the filter logic in the Shop component, avoiding wrong state persistence*/}
         <button onClick={() => displayCart()}>View cart</button>
         <button onClick={() => displayCheckout()}>Checkout</button>
         <button onClick={() => {showOptions(false); showCategoryFilter(true)}}>Filter by category</button>
         {adminMode && <button onClick={() => {showCreateProduct(true); showOptions(false)}}>Register Product</button> }
         {adminMode && <button onClick={() => {showCategoriesManager(true); showOptions(false)}}>Manage Product Categories</button>}
       </div>
     );

 }

 export default Options;
