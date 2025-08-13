
 async function activeHouse (user_id, house_id, bool, token) {
console.log(`bool passado: ${bool}`)
     const response = await fetch(`http://localhost:8000/api/users/${user_id}/houses/static_houses/${house_id}/activate`, {
       headers:{
         Authorization:`Bearer ${token}`,
         "Content-Type":"application/json",
         Accept:"application/json"
       },
       method:"PATCH",
       body:JSON.stringify({activate: bool})
     });

     const json = await response.json();
console.log(`${JSON.stringify(json)}`)
     if (! json.success) {

         return {
           message: json.message,
           success: false,
           data: null
         };

     }

     return {
       message:"",
       success:true,
       data:null
     };

 }


 export default activeHouse;
