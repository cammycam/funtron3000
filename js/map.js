function initialize() {

    "use strict";

    //get location
    if (navigator.geolocation) 
        navigator.geolocation.getCurrentPosition(drawMap);
    else
        document.getElementById('map_canvas').innerHTML = "DERP";
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

google.maps.event.addDomListener(window, 'load', initialize);
