import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";

 function Top ({closeShop}) {

     const {
             setNameFilter,
             setProductListFiltered,
             setShowOptions,
             categoryFilter,
             subCategoryFilter,
             setCategoryFilter
           } = React.useContext(ShopContext);

     const inputText = React.useRef(null);

     const applyNameFilter = React.useCallback(() => {

         const text = inputText.current.value

         if (text) {

             setProductListFiltered(true);

         } else {

             if (!subCategoryFilter && !categoryFilter) setProductListFiltered(false);

         }

         setNameFilter(text);
 
     }, [inputText.current]);

     return (
       <div>

         <button onClick={() => closeShop()}>Close</button>

         <input ref={inputText} onInput={() => {applyNameFilter(); console.log(`texto: ${inputText.current.value}`)}} type="text" placeholder="Search product" />

         <button onClick={() => setShowOptions(true)}>Options</button>

       </div>
     );

 }

 export default Top;
