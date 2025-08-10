
 async function sellHouse (user_id, house_id, token) {

     const response = await fetch(`http://localhost:8000/api/users/${user_id}/houses/all`, {
       method:"DELETE",
       headers:{
         Authorization:`Bearer ${token}`
       }
     });

     const json = await response.json();

     if (json.success) return {success:true, message:json.message};

     return {success:false, message:json.message};

 }

 export default sellHouse;
