import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";
import HubContext from "../../../contexts/HubContext.jsx";

 function ProductCategoryFilter ({showThisComponent = () => {}}) {

     const {
       products,
       setProductListOnDisplay,
       setProductListFiltered,
       setSubCategoryFilter,
       setCategoryFilter,
       categories,
       subcategories
     } = React.useContext(ShopContext);

     const {
       adminMode
     } = React.useContext(HubContext);


     // Keeps which primary category of products the user chose to filter
     const [categoryOnDisplay, setCategoryOnDisplay] = React.useState("");

     const [showCategoryButtons, setShowCategoryButtons] = React.useState(true);
     const [showSubCategoryButtons, setShowSubCategoryButtons] = React.useState(false);


     function ProductSubCategoryFilter ({category}) {


     // Filtering the subcategories of category
         let subcategoriesToShow = subcategories.filter(s => s.parentCategory === category);

         return (
           <>

             <button onClick={() => {

                 setShowCategoryButtons(true);

                 setShowSubCategoryButtons(false);

             }}>Cancel</button>

             <button onClick={() => {

                 setCategoryFilter(""); // To avoid some bugs

                 setCategoryFilter(category);

                 setSubCategoryFilter("");

                 setProductListFiltered(true);

                 showThisComponent(false);

             }}>All</button>

             {subcategoriesToShow.map(c => {

                 return (<button onClick={() => {

                     setSubCategoryFilter(c.name);

                     setCategoryFilter("");

                     setProductListFiltered(true);

                     showThisComponent(false);

                 }}>{c.name}</button>);

             })}

           </>
         );

     }


     return (
       <>

         <button onClick={() => showThisComponent(false)}>Close</button>

         {showCategoryButtons && (<>
           <button onClick={() => {

//               setProductListOnDisplay(products);

               setProductListFiltered(false);

               setCategoryFilter("");

               setSubCategoryFilter("");

               showThisComponent(false);

           }}>All</button>

           {categories.map(c => {

               return (<button onClick={() => {

                   setCategoryOnDisplay(c.name);

                   setShowSubCategoryButtons(true);

                   setShowCategoryButtons(false);

               }}>{c.name}</button>);

           })}

           {adminMode && (
             <button
               onClick={() => {

                   setSubCategoryFilter(null);

                   setCategoryFilter("uncategorized");

                   setProductListFiltered(true);

                   showThisComponent(false);

               }}
             >Show uncategorized products</button>
            )
           }
        </> )}

         {showSubCategoryButtons && <ProductSubCategoryFilter category={categoryOnDisplay} />}

       </>
     );

 }

 export default ProductCategoryFilter;
