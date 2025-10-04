import React from "react";

 function Confirm ({
   showThisComponent = () => {},
   callback = () => {}
 }) {

     return (
       <div>

         <h2>Are you sure?</h2>

         <section>

           <button onClick={() => showThisComponent(false)}>Cancel</button>

           <button
             onClick={() => {

                 callback();

                 showThisComponent(false);

             }}
           >Ok</button>

         </section>

       </div>
     );

 }

 export default Confirm;
