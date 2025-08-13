import getAllHouses from "./getAllHouses.jsx";

 async function buyHouse (user_id, house_id, token) {

   // Buy the house
     const response =
     await fetch(`http://localhost:8000/api/users/${user_id}/houses/static_houses/${house_id}`, {
       method:"POST",
       headers:{
         Authorization:`Bearer ${token}`
       }
     });


     const json = await response.json();

     if (! json.success) {

         return {
           message: json.message,
           success: false,
           data: null
         }

     }


    // Note that this performance error (two requests to server)
    // because the backend code is just made and I do not
    // want to rewrite it. I basically did not thought
    // about the client need the updated data immediately
    // after buy the house. I'm saying about 'getAllHouses'
     const updatedData = await getAllHouses(user_id, token);

     if (updatedData) return {success: true, message: "", data: updatedData, balance: json.data.updated_user_balance};

     return {success: false, message: "Something works wrong", data: null};

 }

 export default buyHouse;
