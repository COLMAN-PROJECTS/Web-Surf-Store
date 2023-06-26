// function initMap() {
//   var map = new Microsoft.Maps.Map(document.getElementById("map"), {
//     center: new Microsoft.Maps.Location(31.0461, 34.8516), // Set the initial center of the map to Israel
//     zoom: 8, // Set the initial zoom level
//   });
//   // Add random markers
//   addRandomMarker(map);
//   addRandomMarker(map);
//   addRandomMarker(map);
//   addRandomMarker(map);
//   addRandomMarker(map);
// }
//
// function addRandomMarker(map) {
//   var lat = getRandomFloat(29.4963, 33.2938); // Random latitude within Israel's boundary
//   var lng = getRandomFloat(34.2676, 35.8922); // Random longitude within Israel's boundary
//   var location = new Microsoft.Maps.Location(lat, lng);
//
//   var pushpin = new Microsoft.Maps.Pushpin(location, null);
//   map.entities.push(pushpin);
// }
//
// function getRandomFloat(min, max) {
//   return Math.random() * (max - min) + min;
// }
//
// $(document).ready(function () {
//   initMap();
// });

//API KEY:  AIzaSyAoQLaZ0-M4dXQcXrYZs77JI610bwF-g5U
function initMap() {
  const Ashdod = {
    lat: 31.7922,
    lng: 34.6497
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17.56,
    center: Ashdod
  });
}