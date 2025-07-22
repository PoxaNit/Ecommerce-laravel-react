import React from "react";
import AuthContext from "../../contexts/AuthContext.jsx";


 function LoginForm ({
   changeForm = () => {} // This change from this form to the register form.
 }) {

        const { setUserEmail, setUserName, setToken, setAuthenticated, setUserId } = React.useContext(AuthContext);

        const form = React.useRef(null);

        const login = React.useCallback(async () => {

            const formData = new FormData(form.current);

            const response = await fetch("http://localhost:8000/api/login", {
              method:"POST",
              body:formData
            });

            const json = await response.json();

            if (json.success) {



                const token = json.token;
console.log(`Token: ${token}`)
                setToken(token);



                const userId = json.data.id;

                setUserId(userId);



                const name = json.data.name;

                setUserName(name);



                const email = json.data.email;

                setUserEmail(email);



                const user = json.data;


                localStorage.setItem("token", token);

                localStorage.setItem("user", JSON.stringify(user));



                setAuthenticated(true);

            } else {

                console.log(`json: ${JSON.stringify(json)}`)

            }

        }, []);

     return (

       <>

         <h1>Login</h1>

         <form ref={form}>

           <label htmlFor="email">Email:</label>

           <input type="email" id="email" name="email" />

           <label htmlFor="password">Password:</label>

           <input type="password" id="password" name="password" />

           <input type="button" onClick={() => changeForm()} value="Sign up" />

           <input type="button" onClick={() => login()} value="submit" />

         </form>

       </>

     );

 }

 export default LoginForm;
