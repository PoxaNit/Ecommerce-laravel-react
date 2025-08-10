
 async function getAllHouses (user_id, token) {
console.log("getAllHouses executed!")
     const response = await fetch(`http://localhost:8000/api/users/${user_id}/houses/all`, {
       headers:{
         Authorization:`Bearer ${token}`
       },
     });

     const json = await response.json();
console.log(`json: ${JSON.stringify(json)}`)
     if (json.success) return json.data;
     else return null;

 }

 export default getAllHouses;
