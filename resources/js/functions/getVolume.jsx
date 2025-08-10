
 function getVolume (width, length, height) {

     const baseArea = (width * length);

     const volume = baseArea * height;

     return volume;

 }

 export default getVolume;
