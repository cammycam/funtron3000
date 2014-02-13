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
function initialize() {

    "use strict";

    //get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(drawMap, showError);
    } else {
		/**
		 * Fired when the browser does not support geolocation
		 * 
		 * @event error.NOT_SUPPORTED
		 **/
        $('#map_canvas')[0].innerHTML = "Your browser does not support geolocation.";
    }
}

/**
 * Draws the map on screen, takes in the position
 * 
 * @method drawMap
 * @param {Object} a set of current coordinates
**/
function drawMap(position) {

    "use strict";

    /**
     * The Map that is later put on screen
     * 
     * @attribute map
     **/
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
/**
 * Called when an error occurs, takes in an error object
 * 
 * @method showError
 * @param {Object} an error
**/
function showError(error) {

    "use strict";
    
    switch (error.code) {
    case error.PERMISSION_DENIED:
        /**
         * Fired when geolocation is denied permission
         * 
         * @event error.PERMISSION_DENIED
         * @param {String} msg A description of the error
         **/
        $('#map_canvas')[0].innerHTML = "User denied the request for Geolocation.";
        break;
    case error.POSITION_UNAVAILABLE:
         /**
          * Fired when position cannot be found
          * 
		  * @event error.POSITION_UNAVAILABLE
          * @param {String} msg A description of the error
          **/
        $('#map_canvas')[0].innerHTML = "Location information is unavailable.";
        break;
    case error.TIMEOUT:
         /**
          * Fired when a timeout occurs
          * 
          * @event error.TIMEOUT
          * @param {String} msg A description of the error
          **/
        $('#map_canvas')[0].innerHTML = "The request to get user location timed out.";
        break;
    case error.UNKNOWN_ERROR:
         /**
          * Fired when an unknown error occurs
          * 
          * @event error.UNKNOWN_ERROR
          * @param {String} msg A description of the error
          **/
        $('#map_canvas')[0].innerHTML = "An unknown error occurred.";
        break;
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
