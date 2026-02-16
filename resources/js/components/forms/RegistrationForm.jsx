import React from "react";
import styles from "../../../css/RegistrationForm.module.css";

 function RegistrationForm ({
   changeForm = () => {} // This is for when user changes from this form to login form
 }) {

     const form = React.useRef(null);

     const [displayMessage, setDisplayMessage] = React.useState("");

     const createUser = React.useCallback(async () => {

         const formData = new FormData(form.current);

         const response = await fetch("http://localhost:8000/api/users", {
           method:"POST",
           body:formData
         });

         const json = await response.json();

         if (!json.success) {setDisplayMessage(json.message)}

         else {setDisplayMessage("User created!")}

     }, []);

     return (
       <>

         <form ref={form} id={styles.regForm}>

           <h1>Registration</h1>

           <label htmlfor="name">Name:</label>

           <input type="text" id="name" name="name" />

           <label htmlfor="email">Email:</label>

           <input type="email" id="email" name="email" />

           <label htmlfor="password">Password:</label>

           <input type="password" id="password" name="password" />

           <input type="button" onClick={() => changeForm()} value="Go to login" />

           <input type="button" onClick={() => createUser()} value="Submit" />

         </form>

         {displayMessage && <p>{displayMessage}</p>}

       </>
     );
 }

 export default RegistrationForm;
