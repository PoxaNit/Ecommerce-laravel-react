
 async function getAllHouses (user_id, token) {

     const response = await fetch(`http://localhost:8000/api/users/${user_id}/houses/all`, {
       headers:{
         Authorization:`Bearer ${token}`
       },
     });

     const json = await response.json();

     if (json.success) return json.data;
     else return null;

 }

 export default getAllHouses;
