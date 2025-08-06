import React from "react";
import Confirmation from "./confirmation/Confirmation.jsx";
import AuthContext from "../../../contexts/AuthContext.jsx";

 function ExitOptions () {

     const { userId, token, setToken, setAuthenticated } = React.useContext(AuthContext);

     const [showConfirmation, setShowConfirmation] = React.useState("");

     const logout = React.useCallback(async function () {

         const data = await fetch("http://localhost:8000/api/logout", {
           method:"DELETE",
           headers:{
             "Authorization":`Bearer ${token}`
           }
         });

         localStorage.removeItem("user");

         localStorage.removeItem("token");

         setAuthenticated(false);

         setToken("");

     }, []);

     const deleteAccount = React.useCallback(async () => {

         await fetch(`http://localhost:8000/api/users/${userId}`, {
           method:"DELETE",
           headers:{
             "Authorization":`Bearer ${token}`
           }
         }).then(r => r.text()).then(t => console.log(t));

         setAuthenticated(false);

         localStorage.removeItem("user");

         localStorage.removeItem("token");

     }, []);

     return (
       <div>

         {showConfirmation === "logout" && <Confirmation setShow={setShowConfirmation} func={logout} title="Logout"/>}

         {showConfirmation === "delete" && <Confirmation setShow={setShowConfirmation} func={deleteAccount} title="Delete account"/>}

         <button onClick={() => setShowConfirmation("logout")}>logout</button>
         <button onClick={() => setShowConfirmation("delete")}>delete account</button>

       </div>
     );

 }

 export default ExitOptions;
