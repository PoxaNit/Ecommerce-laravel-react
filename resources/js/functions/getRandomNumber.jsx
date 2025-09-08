
 function getRandomNumber (min, max, float = false) {

     const n = Math.floor(Math.random() * (max - min) + min);

     console.log(`getRandomNumber: n generated as float: ${parseFloat(n)}`)

     if (float) return parseFloat(n).toFixed(2);

     return n;

 }

 export default getRandomNumber;
