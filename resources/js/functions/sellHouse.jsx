import getAllHouses from "./getAllHouses.jsx";

 async function sellHouse (user_id, house_id, token) {

   // sell the house
     const response =
     await fetch(`http://localhost:8000/api/users/${user_id}/houses/static_houses/${house_id}`, {
       method:"DELETE",
       headers:{
         Authorization:`Bearer ${token}`
       }
     });


     const json = await response.json();

     if (!json.success) {

         return {
           message: json.message,
           success: false,
           data: null
         };

     }


    // Note that this performance error (two requests to server)
    // because the backend code is just made and I do not
    // want to rewrite it. I basically did not thought
    // about the client need the updated data immediately
    // after sell the house. I'm saying about 'getAllHouses'

    // get the updated data
     const json2 = await getAllHouses(user_id, token);


     if (json) return {success: true, data: json2, message: "", balance: json.data.updated_user_balance};

     return {success: false, data: null, message: "Something works wrong"};

 }

 export default sellHouse;
