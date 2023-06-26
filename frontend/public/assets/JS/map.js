

//API KEY:  AIzaSyAoQLaZ0-M4dXQcXrYZs77JI610bwF-g5U
function initMap() {
  const Ashdod = {
    lat: 31.8009,
    lng: 34.6324
  };


  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17.56,
    center: Ashdod
  });
  const marker = new google.maps.Marker({
    position: Ashdod,
    map: map,
    title: "Ashdod"});
}