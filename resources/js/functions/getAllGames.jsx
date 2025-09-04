
 async function getAllGames (token) {

     const response = await fetch(
       `http://localhost:8000/api/games`,
       {
         method:"GET",
         headers:{
           Authorization: `Bearer ${token}`,
           Accept: "application/json",
         }
       }
     );

     const json = await response.json();

     return json;

 }

 export default getAllGames;
