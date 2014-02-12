function initialize() {

    "use strict";

    //get location
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(drawMap,showError);
		}
    else
        document.getElementById('map_canvas').innerHTML = "Error with geolocation.";
}

function drawMap(position) {

    "use strict";
	
	document.getElementById('map_canvas').innerHTML = "DERP3";

    var map = new google.maps.Map($('#map_canvas')[0], {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }).set('styles', [
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#000000' }, { weight: 1.0 }]
            }, {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{ saturation: -100 }, { invert_lightness: true }]
            }, {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ hue: '#ffff00' }, { gamma: 1.4 }, { saturation: 82 }, { lightness: 96 }]
            }, {
                featureType: 'poi.school',
                elementType: 'geometry',
                stylers: [{ hue: '#fff700' }, { lightness: -15 }, { saturation: 99 }]
            }]);

}

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      document.getElementById('map_canvas').innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById('map_canvas').innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      document.getElementById('map_canvas').innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById('map_canvas').innerHTML="An unknown error occurred."
      break;
    }
  }
  
google.maps.event.addDomListener(window, 'load', initialize);
