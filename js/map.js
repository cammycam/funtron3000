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
var globalIndex;
var i;

//Constant Values
var VISITED_POINTS = 1000000;
var LEVEL_UP = 10000000;

var totalPoints = 0;

var interests = [];

interests[0] = {
    name: "music",
    link: "http://ctt.ec/4UTSB",
    points: 0,
    image: "musicBadge.jpg",
    earned: false
};

interests[1] = {
    name: "food",
    link: "http://ctt.ec/86Zd9",
    points: 0,
    image: "foodBadge.jpg",
    earned: false
};

interests[2] = {
    name: "movies",
    link: "http://ctt.ec/aM9Hj",
    points: 0,
    image: "movieBadge.jpg",
    earned: false
};

interests[3] = {
    name: "candy",
    link: "http://ctt.ec/1E9ta",
    points: 0,
    image: "candyBadge.jpg",
    earned: false
};

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

    $('#topBanner').html("<bannerP>Points: " + totalPoints + "</bannerP>");

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

    var contentString = '<a onclick="placeVisited()"href="#">Place Visited</a>',
        marker = new google.maps.Marker({
            position: place.geometry.location
        });

    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
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

function interestClick(index) {
    'use strict';
    if (placeMarkers !== null) {
        for (i = 0; i < placeMarkers.length; i += 1) {
            placeMarkers[i].setMap(null);
        }
    }

    globalIndex = index;

    placeMarkers = [];

    var request = {
        location: userPosition,
        radius: 500,
        query: interests[index].name
    },
        service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    infowindow = new google.maps.InfoWindow();
}

function earnBadge(badgeIndex) {
    'use strict';

    var tweetString = '<a href="' + interests[badgeIndex].link + '"><img src="http://clicktotweet.com/img/tweet-graphic-4.png" alt="Tweet: I earned my ' + interests[badgeIndex].name + ' badge from Funtron3000++-! ' + interests[badgeIndex].link + '" /></a>';
    tweetString += "<p>You earned your " + interests[badgeIndex].name + "  badge!</p>";
    $('#interestDiv').html(tweetString);
    interests[badgeIndex].earned = true;
}

function placeVisited() {
    'use strict';
    totalPoints += VISITED_POINTS;
    var badgesString = '',
        bannerString = "Points: " + totalPoints + "&nbsp; &nbsp;";

    interests[globalIndex].points += VISITED_POINTS;
    $('#interestDiv').html('');
    if (interests[globalIndex].points === LEVEL_UP) {
        earnBadge(globalIndex);
    }

    for (i = 0; i < interests.length; i += 1) {
        if (interests[i].earned) {
            badgesString += '<img src="images/' + interests[i].image + '">';
        }
    }
    $('#topBanner').html("<bannerP>" + bannerString + "</bannerP>");
    $('#badgesBanner').html("<bannerP>" + badgesString + "</bannerP>");
}

google.maps.event.addDomListener(window, 'load', initialize);
