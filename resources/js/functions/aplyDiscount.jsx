
 async function aplyDiscount (token, productId, discountPercent, starts_at, ends_at) {

     const response = await fetch(`http://localhost:8000/api/discounts/products/${productId}`, {
       method: "POST",
       headers:{
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
       body:JSON.stringify({
         discountPercent: discountPercent,
         starts_at: starts_at,
         ends_at: ends_at
       })
     });

     const json = await response.json();
console.log("discount server response: ", json)
 }

 export default aplyDiscount;
