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
       categoryOrSubcategoryInDetails,
       setCategoryOrSubcategoryInDetails,
       setCategories,
       setSubcategories,
       setProducts
     } = React.useContext(ShopContext);


     const shortName = categoryOrSubcategoryInDetails;


     const nameInputRef = React.useRef(null);

     const parentCategoryInputRef = React.useRef(null);

     const updateButtonRef = React.useRef(null);


     const [showMessage, setShowMessage] = React.useState({
       show: false,
       text: null
     });



     const updateData = React.useCallback(async () => {

         const dataToSend = {
           name: nameInputRef.current.value,
           parentCategory: parentCategoryInputRef.current?.value
         };

         const response = await updateCategoryOrSubcategory(token, shortName.id, dataToSend, shortName?.parentCategory ? "s" : null);



          setShowMessage({show: true, text: response.message});

          if (response.success) {

              updateButtonRef.current.disabled = true;

              if (dataToSend?.parentCategory) { // If the object that was updated was a subcategory, it's true (obviously because only subcategory has this property)

                  const updatedSubcategory = response.data.subcategories.find(s => s.id === data.id);

                  setSubcategories(response.data.subcategories);

                  setCategoryOrSubcategoryInDetails(updatedSubcategory);

              } else {

                  const updatedCategory = response.data.categories.find(c => c.id === data.id);

                  setCategories(response.data.categories);

                  setSubcategories(response.data.subcategories); // With the parentCategory properties updated

                  setCategoryOrSubcategoryInDetails(updatedCategory);

              }

             setProducts(response.data.products);

         }


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
