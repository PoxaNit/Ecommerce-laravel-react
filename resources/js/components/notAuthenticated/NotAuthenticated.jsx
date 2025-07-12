import React from "react";
import LoginForm from "../forms/LoginForm.jsx";
import RegistrationForm from "../forms/RegistrationForm.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";

 function NotAuthenticated () {

     const { setAuthenticated } = React.useContext(AuthContext);
     const [showLogin, setShowLogin] = React.useState(true);

     return (
       <>

           {showLogin ? <LoginForm changeForm={() => setShowLogin(false)}/>
           : <RegistrationForm changeForm={() => setShowLogin(true)}/>}

       </>
     );

 }

 export default NotAuthenticated;
