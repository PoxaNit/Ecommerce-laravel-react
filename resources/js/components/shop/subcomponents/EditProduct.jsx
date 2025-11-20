import React from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";
import editProduct from "../../../functions/editProduct.jsx";
import ShowMessage from "./ShowMessage.jsx";

 function EditProduct ({
   showThisComponent = () => {},
   product = {}
 }) {

     const {
       token
     } = React.useContext(AuthContext);

     const {
       products,
       setProducts,
       setShowProductDetails
     } = React.useContext(ShopContext);

     const nameInput = React.useRef(null);

     const descriptionInput = React.useRef(null);

     const short_description_input = React.useRef(null);

     const priceInput = React.useRef(null);

     const stockInput = React.useRef(null);

     const weightInput = React.useRef(null);

     const heightInput = React.useRef(null);

     const lengthInput = React.useRef(null);

     const widthInput = React.useRef(null);

     const categoryInput = React.useRef(null);

     const subCategoryInput = React.useRef(null);

     const is_active_input = React.useRef(null);



     const [displayMessage, setDisplayMessage] = React.useState({
       show: false,
       message: ""
     });

     React.useEffect(() => {

         nameInput.current.value = product.name;
         descriptionInput.current.value = product.description;
         short_description_input.current.value = product.short_description;
         priceInput.current.value = product.price;
         stockInput.current.value = product.stock;
         weightInput.current.value = product.weight;
         heightInput.current.value = product.height;
         lengthInput.current.value = product.length;
         widthInput.current.value = product.width;
         categoryInput.current.value = product.categories.category;
         subCategoryInput.current.value = product.categories.subcategory;
         is_active_input.current.checked = product.is_active;

     }, []);


     const sendData = React.useCallback(async () => {

         const requestBody = JSON.stringify({
           name: nameInput.current.value,
           description: descriptionInput.current.value,
           short_description: short_description_input.current.value,
           price: priceInput.current.value,
           stock: stockInput.current.value,
           is_active: is_active_input.current.checked,
           weight: weightInput.current.value,
           height: heightInput.current.value,
           width: widthInput.current.value,
           length: lengthInput.current.value,
           categories: JSON.stringify({
             category: categoryInput.current.value,
             subcategory: subCategoryInput.current.value
           })
         });

         localStorage.removeItem("products");

         const response = await editProduct(token, product.id, requestBody);

         setDisplayMessage({show: true, message: response.message});

         if (response.success) {

             setProducts(response.data.products);

             setShowProductDetails(false);

         }

     });

     return (
       <form>

         <button
          onClick={() => showThisComponent(false)}
         >Close</button>

         <h1>Edit Painel</h1>

         <label htmlFor="name">
            Name:
         </label>

         <br/>

         <input
            id="name"
            ref={nameInput}
         />

         <br/>

         <label htmlFor="description">
            Description:
         </label>

         <br/>

         <textarea
            id="description"
            ref={descriptionInput}
         >

         </textarea>

         <br/>

         <label htmlFor="short_description">
            Short Description:
         </label>

         <br/>

         <textarea
            id="short_description"
            ref={short_description_input}
         >

         </textarea>

         <br/>

         <label htmlFor="price">
            Price:
         </label>

         <br/>

         <input
            type="number"
            id="price"
            ref={priceInput}
         />

         <br/>

         <label htmlFor="stock">
            Stock:
         </label>

         <br/>

         <input
            type="number"
            ref={stockInput}
         />

         <br/>

         <label htmlFor="weight">
            Weight: 
         </label>

         <br/>

         <input
            type="number"
            id="weight"
            ref={weightInput}
         />

         <br/>

         <label htmlFor="height">
            Height:
         </label>

         <br/>

         <input
            type="number"
            id="height"
            ref={heightInput}
         />

         <br/>

         <label htmlFor="width">
            Width:
         </label>

         <br/>

         <input
            type="number"
            id="width"
            ref={widthInput}
         />

         <br/>

         <label htmlFor="length">
            Length:
         </label>

         <br/>

         <input
            type="number"
            id="length"
            ref={lengthInput}
         />

         <br/>

         <label htmlFor="category">
            Category:
         </label>

         <br/>

         <input
            id="category"
            ref={categoryInput}
         />

         <br/>

         <label htmlFor="subCategory">
            Sub-Category:
         </label>

         <br/>

         <input
            id="subCategory"
            ref={subCategoryInput}
         />

         <br/>

         <label htmlFor="is_active">
            Is active:
         </label>

         <input
           type="checkbox"
           ref={is_active_input}
         />

         <button
            onClick={e => {
                e.preventDefault();
                sendData();
            }}
         >Send Data</button>

         {displayMessage.show && <ShowMessage message={displayMessage.message} />}

       </form>
     );

 }

 export default EditProduct;
