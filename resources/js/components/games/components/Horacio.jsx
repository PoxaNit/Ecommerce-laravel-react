import React from "react";

 function Horacio ({
   expression = "horacio", // It's how Horacio must look (it decides wich image of Horacio's expression use)
   withRows = false,
   action = {
     animation_type: "", // What Horacio is doing
     animation_time: 0, // In milliseconds
     animation_last_frame_by_finish_animation: "default"
   },
   message = ""
 }) {

     return (
       <div>

         {withRows && <hr/>}

         <img src={`images/horacio/${expression}.png`} alt="Horacio" />

         <p>{message}</p>

         {withRows && <hr/>}

       </div>
     );

 }

 export default Horacio;
