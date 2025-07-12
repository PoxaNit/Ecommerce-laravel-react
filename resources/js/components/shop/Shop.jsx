import React from "react";
import ShopContext from "../../contexts/ShopContext.jsx";

 function Shop ({closeShop = () => {}}) {

     const [products, setProducts] = React.useState({});

     return (

       <ShopContext.Provider value={{
         products,
         setProducts
       }}>

         <Top />

         <ProductList />

       </ShopContext.Provider>

     );

 }

 export default Shop;
