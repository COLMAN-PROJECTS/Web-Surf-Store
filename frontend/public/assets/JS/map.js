

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
              let videoUrl=element.video;
              let beachDescription=element.description;
              let spotName=element.spot;
              var htmlCode = `
    <div class="row">
      <div class="col">
        <section>
          <div class="container-fluid" style="height: 230px; margin-top: 20px; width: 1050px;">
            <div class="photo-card" style="height: 240px; margin-left: 2px; margin-right: 2px; width: 1000px;">
              <div class="photo-background" style="width: 424px;">
                <div>
                  <iframe width="400" height="238" src=${videoUrl} frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              <div class="photo-details">
                <h1>${spotName}</h1>
                <p>${beachDescription} </p>
                <div class="weather-div" style="color: white"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
              $('#beach-container').append(htmlCode);
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
