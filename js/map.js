function initialize() {

    "use strict";

    //get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(drawMap, showError);
    } else {
        $('#map_canvas')[0].innerHTML = "Your browser does not support geolocation.";
    }
}

function drawMap(position) {

    "use strict";

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

function showError(error) {

    "use strict";
    
    switch (error.code) {
    case error.PERMISSION_DENIED:
        $('#map_canvas')[0].innerHTML = "User denied the request for Geolocation.";
        break;
    case error.POSITION_UNAVAILABLE:
        $('#map_canvas')[0].innerHTML = "Location information is unavailable.";
        break;
    case error.TIMEOUT:
        $('#map_canvas')[0].innerHTML = "The request to get user location timed out.";
        break;
    case error.UNKNOWN_ERROR:
        $('#map_canvas')[0].innerHTML = "An unknown error occurred.";
        break;
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
