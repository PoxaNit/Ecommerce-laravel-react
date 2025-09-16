
 function calculateDiscount (
   productPrice,
   discountPercent = 0,
   finalPrice = 0,
   mode = "percent" // percent => calculate the percentage | finalPrice => calculate the final price
 ) {

     if (productPrice <= 0 || finalPrice > productPrice || discountPercent > 100) return 0;

     switch (mode) {

         case "percent": // Calculate the given percentage and returns the final price

           return productPrice * (1 - (discountPercent / 100));

         case "finalPrice": // Use the final price to discover the percentage of discount and return the percentage

           return ((productPrice - finalPrice) / productPrice) * 100;

         default:

           throw new Error(`Unsupported mode: ${mode}`);

     }


 }

 export default calculateDiscount;
