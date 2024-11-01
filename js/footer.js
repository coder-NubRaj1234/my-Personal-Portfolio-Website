
//Whine user click the location icon the window page caange in to location url.....
const locationIcon = document.getElementById("location-icon");
const locationUrl = "https://maps.app.goo.gl/hYdB3rLdcPUSuXCh9";

locationIcon.addEventListener("click" , function(e){
    window.open(locationUrl , "_blank");
});