import React from "react";
import createProduct from "../../../functions/createProduct.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";
import ShopContext from "../../../contexts/ShopContext.jsx";

 function CreateProduct ({showThisComponent = () => {}}) {

     const [showProductImage, setShowProductImage] = React.useState({
       show: false,
       data: null
     });

     const {
       token
     } = React.useContext(AuthContext);

     const {
       setProducts
     } = React.useContext(ShopContext);

     const [serverMessage, setServerMessage] = React.useState({
       show: false,
       data: ""
     });

     const nameInput = React.useRef(null);

     const descriptionInput = React.useRef(null);

     const short_descriptionInput = React.useRef(null);

     const priceInput = React.useRef(null);

     const is_activeInput = React.useRef(null);

     const stockInput = React.useRef(null);

     const weightInput = React.useRef(null);

     const heightInput = React.useRef(null);

     const widthInput = React.useRef(null);

     const lengthInput = React.useRef(null);

     const slugInput = React.useRef(null);

     const skuInput = React.useRef(null);

     const categoryInput = React.useRef(null);

     const subcategoryInput = React.useRef(null);

     const imageInput = React.useRef(null);

     const submitInput = React.useRef(null);

     const loadProductImage = React.useCallback(() => {

         const file = imageInput.current.files[0];

         const fileReader = new FileReader();

         fileReader.onload = () => {
             setShowProductImage({
               show: true,
               data: fileReader.result
             });
         }

         fileReader.readAsDataURL(file);

     }, []);


     const sendData = React.useCallback(async (e) => {

         e.preventDefault();

         const formData = new FormData();

         formData.append("name", nameInput.current.value);
         formData.append("description", descriptionInput.current.value);
         formData.append("short_description", short_descriptionInput.current.value);
         formData.append("price", priceInput.current.value);
         formData.append("stock", stockInput.current.value);
         formData.append("is_active", is_activeInput.current.checked ? 1 : 0);
         formData.append("weight", weightInput.current.value);
         formData.append("height", heightInput.current.value);
         formData.append("width", widthInput.current.value);
         formData.append("length", lengthInput.current.value);
         formData.append("slug", slugInput.current.value);
         formData.append("sku", skuInput.current.value);
         formData.append("category", categoryInput.current.value);
         formData.append("subcategory", subcategoryInput.current.value);


         if (imageInput.current.files[0]) {

             formData.append("image", imageInput.current.files[0]);

         }

         const response = await createProduct(token, formData);

         submitInput.current.disabled = true;

         setServerMessage({
           show: true,
           data: response.message
         });

         if (response.success) {setProducts(response.data)}

         setTimeout(() => {

             if (response.success) {

                 showThisComponent(false);

             } else {

                 submitInput.current.disabled = false;

             }

         }, 3000);

     }, []);


     return (
       <form onSubmit={sendData}>

         <button type="button" onClick={() => showThisComponent(false)}>Close</button>

         <h1>Register a Product</h1>

         <label htmlFor="name">Name:</label>

         <input
           type="text"
           id="name"
           ref={nameInput}
           required
         />

         <label htmlFor="description">Description:</label>

         <textarea
           required
           id="description"
           ref={descriptionInput}
         >

         </textarea>

         <label htmlFor="short_description">Short Description:</label>

         <textarea
           required
           id="short_description"
           ref={short_descriptionInput}
         >

         </textarea>

         <label htmlFor="price">Price ($):</label>

         <input
           required
           type="number"
           id="price"
           ref={priceInput}
         />

         <label htmlFor="stock">In Stock:</label>

         <input
           required
           type="number"
           id="stock"
           ref={stockInput}
         />

         <label htmlFor="is_active">Is active:</label>

         <input
           id="is_active"
           type="checkbox"
           ref={is_activeInput}
         />

         <label htmlFor="weight">Weight (kg):</label>

         <input
           required
           type="number"
           id="weight"
           ref={weightInput}
         />

         <label htmlFor="height">Height (m):</label>

         <input
           required
           type="number"
           id="height"
           ref={heightInput}
         />

         <label htmlFor="width">Width (m):</label>

         <input
           required
           type="number"
           id="width"
           ref={widthInput}
         />

         <label htmlFor="length">length (m):</label>

         <input
           required
           type="number"
           id="length"
           ref={lengthInput}
         />

         <label htmlFor="slug">Slug:</label>

         <input
           required
           type="text"
           id="slug"
           ref={slugInput}
         />

         <label htmlFor="sku">Sku:</label>

         <input
           required
           type="text"
           id="sku"
           ref={skuInput}
         />

         <label htmlFor="category">Category:</label>

         <input
           required
           type="text"
           id="category"
           ref={categoryInput}
         />

         <label htmlFor="subcategory">Sub-Category:</label>

         <input
           required
           type="text"
           id="subcategory"
           ref={subcategoryInput}
         />

         <label htmlFor="image">Image:</label>

         <input
           required
           type="file"
           id="image"
           ref={imageInput}
           onChange={loadProductImage}
         />

         {
           showProductImage.show && <img alt="Product Image" src={showProductImage.data}/>
         }

         <button ref={submitInput} type="submit">Send Data</button>

         {serverMessage.show && <p>{serverMessage.data}</p>}

       </form>
     );

 }

 export default CreateProduct;

