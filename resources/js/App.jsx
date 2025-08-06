import React from "react";
import ReactDOM from "react-dom/client";
import Hub from "./components/hub/Hub.jsx";
import AuthContext from "./contexts/AuthContext.jsx";
import NotAuthenticated from "./components/notAuthenticated/NotAuthenticated.jsx";

 function App () {

     const [authenticated, setAuthenticated] = React.useState(false);
     const [token, setToken] = React.useState("");
     const [userName, setUserName] = React.useState("");
     const [userEmail, setUserEmail] = React.useState("");
     const [userId, setUserId] = React.useState(0);
     const [userBalance, setUserBalance] = React.useState(0.00);

localStorage.removeItem("token");
localStorage.removeItem("products");

     const findToken = React.useCallback(async () => {

         const token = await localStorage.getItem("token");

         if (token) {

             setToken(token);

             setAuthenticated(true);

         }

     }, []);



     const executeUseEffect = React.useRef(true);

     React.useEffect(() => {

         if (executeUseEffect.current) {

             findToken();

             executeUseEffect.current = false;

         }

     }, []);



     return (

       <AuthContext.Provider value={{
         authenticated,
         setAuthenticated,
         token,
         setToken,
         userId,
         setUserId,
         userName,
         setUserName,
         userEmail,
         setUserEmail,
         userBalance,
         setUserBalance
       }}>

           {authenticated ? <Hub /> : <NotAuthenticated />}

       </AuthContext.Provider>

     );

 }


 const root = ReactDOM.createRoot(document.getElementById("root"));

 root.render(<App/>);
