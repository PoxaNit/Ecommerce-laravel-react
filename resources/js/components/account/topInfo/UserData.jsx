import React from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";

 function UserData () {

     const { userName, userEmail } = React.useContext(AuthContext);

     return (
       <div>

            <strong>Name:</strong>

            <p>{userName}</p>

            <strong>Email:</strong>

            <p>{userEmail}</p>

       </div>
     );

 }

 export default UserData;
