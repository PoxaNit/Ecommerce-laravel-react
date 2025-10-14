import React from "react";

 function ManageProductCategories ({
   showThisComponent = () => {}
 }) {

     const [listOnDisplay, setListOnDisplay] = React.useState([]);

     return (
       <>

           <header>

             <section>

               <button onClick={() => showThisComponent(false)}>Close</button>

               <h1>Product Categories Painel</h1>

             </section>


             <section>

               <button>Categories</button>

               <button>Sub-Categories</button>

             </section>

           </header>             

           <ul>{
             listOnDisplay.map(c => )
           }</ul>

       </>
     );

 }
