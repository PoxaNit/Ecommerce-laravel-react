import React from "react";
import ShopContext from "../../../contexts/ShopContext.jsx";

 function ProductCategoryFilter ({showThisComponent = () => {}}) {

     const {
       products,
       setProductListOnDisplay,
       setProductListFiltered,
       setSubCategoryFilter,
       setCategoryFilter
     } = React.useContext(ShopContext);

     const [categories, setCategories] = React.useState([]);
     const [subCategories, setSubCategories] = React.useState([]);

     // Keeps which primary category of products the user chose to filter
     const [categoryOnDisplay, setCategoryOnDisplay] = React.useState("");

     const [showCategoryButtons, setShowCategoryButtons] = React.useState(true);
     const [showSubCategoryButtons, setShowSubCategoryButtons] = React.useState(false);

     const extractCategoriesFromProducts = React.useCallback(() => {

         let categoryList = [];

         let subCategoryList = [];

         products.forEach(product => {

             const category = product.categories.category;

             if (categoryList.some(c => c === category)) return null;

             categoryList.push(category);

         });


         products.forEach(product => {

             const subCategory = product.categories.subcategory;

             if (subCategoryList.some(c => c === subCategory)) return null;

             subCategoryList.push(subCategory);

         });

         setCategories(categoryList);

         setSubCategories(subCategoryList);

     }, [products]);



         const executeUseEffect = React.useRef(true);

         React.useEffect(() => {

             if (executeUseEffect.current) {

                 extractCategoriesFromProducts();

                 executeUseEffect.current = false;

             }

         }, []);


     function ProductSubCategoryFilter ({category}) {


     // Filtering the subcategories of category
         const productsFiltered = products.filter(p => p.categories.category === category);

         let subCategories = [];

         productsFiltered.forEach(p => {

             if (subCategories.some(c => c === p.categories.subcategory)) return null;

             subCategories.push(p.categories.subcategory);

         });


         return (
           <>

             <button onClick={() => {

                 setShowCategoryButtons(true);

                 setShowSubCategoryButtons(false);

             }}>Cancel</button>

             <button onClick={() => {

                 setCategoryFilter("");

                 setCategoryFilter(category);

                 setSubCategoryFilter("");

                 setProductListFiltered(true);

                 showThisComponent(false);

             }}>All</button>

             {subCategories.map(c => {

                 return (<button onClick={() => {

                     setSubCategoryFilter(c);

                     setCategoryFilter("");

                     setProductListFiltered(true);

                     showThisComponent(false);

                 }}>{c}</button>);

             })}

           </>
         );

     }


     return (
       <>

         <button onClick={() => showThisComponent(false)}>Close</button>

         {showCategoryButtons && (<>
           <button onClick={() => {

               setProductListOnDisplay(products);

               setProductListFiltered(false);

               setCategoryFilter("");

               setSubCategoryFilter("");

               showThisComponent(false);

           }}>All</button>

           {categories.map(c => {

               return (<button onClick={() => {

                   setCategoryOnDisplay(c);

                   setShowSubCategoryButtons(true);

                   setShowCategoryButtons(false);

               }}>{c}</button>);

           })}
        </> )}

         {showSubCategoryButtons && <ProductSubCategoryFilter category={categoryOnDisplay} />}

       </>
     );

 }

 export default ProductCategoryFilter;
