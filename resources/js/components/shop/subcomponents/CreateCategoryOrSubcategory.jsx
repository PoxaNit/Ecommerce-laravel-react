import React from "react";
import createCategoryOrSubcategory from "../../../functions/createCategoryOrSubcategory.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import ShowMessage from "./ShowMessage.jsx";

 function CreateCategoryOrSubcategory ({showThisComponent}) {

     const {
       token
     } = React.useContext(AuthContext);

     const {
       setCategories,
       setSubcategories
     } = React.useContext(ShopContext);


     const [displayMessage, setDisplayMessage] = React.useState({
       show: false,
       message: ""
     });

     const [subcategoryMode, setSubcategoryMode] = React.useState(false);


     const nameInputRef = React.useRef(null);

     const parentCategoryInputRef = React.useRef(null);

     const isActiveInputRef = React.useRef(null);

     const submitButtonRef = React.useRef(null);


     const submitData = React.useCallback(async e => {

         e.preventDefault();

         const name = nameInputRef.current.value;

         const isActive = isActiveInputRef.current.checked;

         let data = {name: name, active: isActive};
 
         if (subcategoryMode)
             data.parentCategory = parentCategoryInputRef.current.value;

         const response = await createCategoryOrSubcategory(token, data, subcategoryMode ? "s" : null);

         setDisplayMessage({show: true, message: response.message});

         if (response.success) {

             setCategories(response.data.categories);

             setSubcategories(response.data.subcategories);

         }

     }, [subcategoryMode]);


     return (
       <form onSubmit={e => e.preventDefault()}>

           <button
             onClick={() => showThisComponent(false)}
           >Close</button>

           <h1>Form</h1>

           <p>Creating: <strong>{subcategoryMode ? "subcategory" : "category"}</strong></p>

           <button
             onClick={() => setSubcategoryMode(prev => !prev)}
           >{subcategoryMode ? "Category mode" : "Subcategory mode"}</button>

           <label htmlFor="name">Name:</label>

           <input type="text" id="name" ref={nameInputRef} />

           {subcategoryMode && (
             <>
               <label htmlFor="parentCategory">Parent category:</label>

               <input type="text" id="parentCategory" ref={parentCategoryInputRef} />
             </>
           )}

           <label htmlFor="isActive">Is active:</label>

           <input type="checkbox" id="isActive" ref={isActiveInputRef} />

           <button
             onClick={e => submitData(e)}
           >Submit</button>

           <section>
             {displayMessage.show && (
               <ShowMessage message={displayMessage.message} />
             )}
           </section>

       </form>
     );

 }

 export default CreateCategoryOrSubcategory;
