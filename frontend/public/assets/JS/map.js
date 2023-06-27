

//API KEY:  AIzaSyAoQLaZ0-M4dXQcXrYZs77JI610bwF-g5U
function initMap() {
  const defaultZoom = {
    lat: 31.8009,
    lng: 34.6324
  };
  const map = new google.maps.Map($('#map')[0],{zoom: 17.56, center: defaultZoom});

  $.ajax({
    url: '/frontend/DB/BeachInfo.json',
    dataType: 'json',
      success: function (data) {
        data.forEach(
            function (element) {
              let marker = new google.maps.Marker({
                position: {lat: element.lat, lng: element.long},
                map: map,
                title: element.spot,
              })
            })
      }})
  }

  function mapScript() {
    let script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoQLaZ0-M4dXQcXrYZs77JI610bwF-g5U";
    script.async = true;
    script.defer = true;

    script.onload = function () {
      initMap();
    }


    document.body.appendChild(script);
  }

  mapScript();
