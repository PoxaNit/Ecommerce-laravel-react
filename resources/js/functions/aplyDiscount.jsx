
 async function aplyDiscount (token, productId, price) {
console.log("aplyDiscount function executing...")

console.log(`type of price: ${typeof price}`)
     const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
       method: "PATCH",
       headers:{
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
       body:JSON.stringify({
         price: parseFloat(price).toFixed(2)
       })
     });

     const json = await response.json();

console.log(`json: ${JSON.stringify(json)}`)

 }

 export default aplyDiscount;
