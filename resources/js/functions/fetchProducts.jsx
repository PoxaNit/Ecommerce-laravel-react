import React from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import ShopContext from "../contexts/ShopContext.jsx";

 const fetchProduct = async () => {

     const { setProducts } = React.useContext(ShopContext);
     const { token } = React.useContext(AuthContext);



     const response =
       await fetch("http://localhost:8000/api/products", {
         method:"GET",
         headers:{
           "Authorization":`Bearer ${token}`
         }
       });

     const json = await response.json();

     const products = json.data;

     setProducts(products);

     const productsToLocalStorage = JSON.stringify(products);

     localStorage.setItem("products", productsToLocalStorage);

     return products;

 }

 export default fetchProduct;
