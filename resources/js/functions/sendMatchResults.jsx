
 async function sendMatchResults (
   userId,
   gameId,
   result,
   points_reward,
   money_reward,
   token
 ) {

console.log(`executing sendMatchResults...`)
console.log(`data received as arguments: ${userId}, ${gameId}, ${result}, ${points_reward}, ${money_reward}, ${token}`)

     const response = await fetch(`http://localhost:8000/api/users/${userId}/game_stats/game/${gameId}`, {
       headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`,
         "Content-Type":"application/json"
       },
       method:"POST",
       body:JSON.stringify({
         result:result,
         points_reward:points_reward,
         money_reward:money_reward
       })
     }).then(r => r.text()).then(t => console.log(t));

 }

 export default sendMatchResults;
