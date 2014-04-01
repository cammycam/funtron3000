/**
 * Provides the base, provides features for the map module
 * 
 * @module maptron
 * @main GoogleMap
 * @class map
 **/
 /**
 * Initializes the map
 * 
 * @method initialize
 **/
var map;
var infowindow;
var userPosition;
var userMarker;
var placeMarkers = null;
var i;

/**
 * Called when an error occurs, takes in an error object
 * 
 * @method showError
 * @param {Object} an error
**/
function showError(error) {
    'use strict';

    switch (error.code) {
    case error.PERMISSION_DENIED:
        /**
         * Fired when geolocation is denied permission
         * 
         * @event error.PERMISSION_DENIED
         * @param {String} msg A description of the error
         **/
        $('#map-canvas').html("<p>User denied the request for Geolocation.</p>");
        break;
    case error.POSITION_UNAVAILABLE:
          /**
          * Fired when position cannot be found
          * 
          * @event error.POSITION_UNAVAILABLE
          * @param {String} msg A description of the error
          **/
        $('#map-canvas').html("<p>Location information is unavailable.</p>");
        break;
    case error.TIMEOUT:
          /**
          * Fired when a timeout occurs
          * 
          * @event error.TIMEOUT
          * @param {String} msg A description of the error
          **/
        $('#map-canvas').html("<p>The request to get user location timed out.</p>");
        break;
    case error.UNKNOWN_ERROR:
         /**
          * Fired when an unknown error occurs
          * 
          * @event error.UNKNOWN_ERROR
          * @param {String} msg A description of the error
          **/
        $('#map-canvas').html("<p>An unknown error occurred.</p>");
        break;
    default:
        $('#map-canvas').html("<p>Non-specific error occurred.</p>");
    }
}

function changePosition(position) {
    'use strict';

    userMarker.setMap(null);
    userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    userMarker = new google.maps.Marker({
        position: userPosition
    });
    userMarker.setMap(map);
}

/**
 * Draws the map on screen, takes in the position
 * 
 * @method drawMap
 * @param {Object} a set of current coordinates
**/
function drawMap(position) {
    /**
     * The Map that is later put on screen
     * 
     * @attribute map
     **/
    'use strict';

    userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map($('#map-canvas').get(0), {
        center: userPosition,
        zoom: 15
    });
    //spawn marker at dude/dudette's position
    userMarker = new google.maps.Marker({
        position: userPosition
    });
    userMarker.setMap(map);

    navigator.geolocation.watchPosition(changePosition, showError);
}

function initialize() {
    'use strict';

    //get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(drawMap, showError);
    } else {
        $('#map-canvas').html("<p>Your browser does not support geolocation.</p>");
    }
}

function createMarker(place) {
    'use strict';

    var marker = new google.maps.Marker({
            position: place.geometry.location
        });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name).open(map, this);
    });
    return marker;
}

function callback(results, status) {
    'use strict';

    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (i = 0; i < results.length; i += 1) {
            placeMarkers[i] = createMarker(results[i]);
        }
    }
}

function interestClick(query) {
    'use strict';
    if (placeMarkers !== null) {
        for (i = 0; i < placeMarkers.length; i += 1) {
            placeMarkers[i].setMap(null);
        }
    }
    
    placeMarkers = [];

    var request = {
        location: userPosition,
        radius: 500,
        query: query
    },
        service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    infowindow = new google.maps.InfoWindow();
}

google.maps.event.addDomListener(window, 'load', initialize);
