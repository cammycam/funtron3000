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
var map, userMarker, infowindow;

function initialize() {
    //get location
    if (navigator.geolocation) {
		drawMap();
        navigator.geolocation.watchPosition(changePosition, showError);
    } else {
                /**
                 * Fired when the browser does not support geolocation
                 * 
                 * @event error.NOT_SUPPORTED
                 **/
        $('#map-canvas').html("<p>Your browser does not support geolocation.</p>");
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
            position: place.geometry.location
        });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var i;
        for (i = 0; i < results.length; i += 1) {
            createMarker(results[i]);
        }
    }
}

/**
 * Draws the map on screen, takes in the position
 * 
 * @method drawMap
 * @param {Object} a set of current coordinates
**/
function drawMap() {
    /**
     * The Map that is later put on screen
     * 
     * @attribute map
     **/

    var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map($('#map-canvas').get(0), {
        center: userPosition,
        zoom: 15
    });
    //spawn marker at dude/dudette's position
     userMarker = new google.maps.Marker({
            position: userPosition
        }).setMap(map);
    var request = {
            location: userPosition,
            radius: 5000,
            types: ['store']
        },
        service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();
    service.nearbySearch(request, callback);
}

function changePosition(position) {
	userMarker.setMap(null);
	var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	userMarker = new google.maps.Marker({
            position: userPosition
        }).setMap(map);
}

/**
 * Called when an error occurs, takes in an error object
 * 
 * @method showError
 * @param {Object} an error
**/
function showError(error) {

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
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
