//bing maps version:
//bing maps api key :Aklwgn06CATK6B6p_YjtzO8GCnTMXYdGdHlgvscFh8elmi-15lDJGsjWgwxW-Eh2

function initMap() {
  const defaultZoom = {
    lat: 31.8009,
    lng: 34.6324
  };
  const map = new Microsoft.Maps.Map($('#map')[0], {
    zoom: 17.56,
    center: new Microsoft.Maps.Location(defaultZoom.lat, defaultZoom.lng)
  });

  $.ajax({
    url: 'http://localhost:3000/beachInfo',
    type: 'GET',
    application: 'json',
    dataType: 'json',
    success: function (data) {
      data.forEach(function (element) {
        let location = new Microsoft.Maps.Location(element.lat, element.long);
        let pin = new Microsoft.Maps.Pushpin(location, {
          title: element.spot
        });
        map.entities.push(pin);
      });
    }
  });
}

function mapScript() {
  let script = document.createElement("script");
  script.src = "https://www.bing.com/api/maps/mapcontrol?key=Aklwgn06CATK6B6p_YjtzO8GCnTMXYdGdHlgvscFh8elmi-15lDJGsjWgwxW-Eh2&callback=initMap";
  script.async = true;
  script.defer = true;
  // initMap();
  document.body.appendChild(script);
}

mapScript();




//google maps version:
// function initMap() {
//   const defaultZoom = {
//     lat: 31.8009,
//     lng: 34.6324
//   };
//   const map = new google.maps.Map($('#map')[0],{zoom: 17.56, center: defaultZoom});
//
//   $.ajax({
//     url: 'http://localhost:3000/beachInfo',
//     type: 'GET',
//     application: 'json',
//     dataType: 'json',
//       success: function (data) {
//         data.forEach(
//             function (element) {
//               let marker = new google.maps.Marker({
//                 position: {lat: element.lat, lng: element.long},
//                 map: map,
//                 title: element.spot,})
//             })
//       }})
//   }
//
//   function mapScript() {
//     let script = document.createElement("script");
//     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoQLaZ0-M4dXQcXrYZs77JI610bwF-g5U";
//     script.async = true;
//     script.defer = true;
//
//     script.onload = function () {
//       initMap();
//     }
//     document.body.appendChild(script);
//   }
//
//   mapScript();
