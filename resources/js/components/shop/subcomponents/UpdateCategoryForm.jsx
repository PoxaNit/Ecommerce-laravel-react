import React from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import updateCategoryOrSubcategory from "../../../functions/updateCategoryOrSubcategory.jsx";

 function UpdateCategoryForm ({
   showThisComponent = () => {},
   data = {}, // The category or subcategory object to be updated
   subcategoryMode = false //
 }) {

     const {
       token
     } = React.useContext(AuthContext);

     const {
       categoryOrSubcategoryInDetails
     } = React.useContext(ShopContext);


     const shortName = categoryOrSubcategoryInDetails;


     const nameInputRef = React.useRef(null);

     const parentCategoryInputRef = React.useRef(null);

     const updateButtonRef = React.useRef(null);


     const [showMessage, setShowMessage] = React.useState({
       show: false,
       text: null
     });


   // The names of the fields of the data object to be updated
     const [nameValue, setNameValue] = React.useState(shortName.name);
     const [parentCategoryValue, setParentCategoryValue] = React.useState(shortName?.parentCategory);


     const updateData = React.useCallback(async () => {

         const dataToSend = {
           name: nameInputRef.current.value,
           parentCategory: parentCategoryInputRef.current?.value
         };

         const response = await updateCategoryOrSubcategory(token, shortName.id, dataToSend, shortName?.parentCategory);

          if (response.success)
              updateButtonRef.current.disabled = true;

          setShowMessage({show: true, text: response.message});

     }, []);

     return (
       <form>

         <button
           onClick={() => showThisComponent(false)}
         >Close</button>

         <h1>Update Form</h1>

         <h2>Actual name: {shortName.name}</h2>

         <label htmlFor="name">Name:</label>

         <input
           type="text"
           id="name"
           onChange={e => setNameValue(e.target.value)}
           ref={nameInputRef}
         />

         {
           subcategoryMode && (
               <>
                 <h2>Actual Parent Category: {shortName.parentCategory}</h2>

                 <label htmlFor="parentCategory">Parent Category:</label>

                 <input
                   type="text"
                   id="parentCategory"
                   onChange={e => parentCategoryValue(e.target.value)}
                   ref={parentCategoryInputRef}
                 />
               </>
           )
         }

         <button
           onClick={e => updateData(e)}
           ref={updateButtonRef}
           type="button"
         >Update</button>

         {
           showMessage.show && <p>{showMessage.text}</p>
         }

       </form>
     );

 }

 export default UpdateCategoryForm;
