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
var totalPoints = 0;
var foodPoints = 0;
var candyPoints = 0;
var moviePoints = 0;
var musicPoints = 0;
var musicEarned = false;
var foodEarned = false;
var candyEarned = false;
var movieEarned = false;
var globalQuery;

var LEVEL_UP = 10000000;

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

function interestClick(query) {
    'use strict';
    if (placeMarkers !== null) {
        for (i = 0; i < placeMarkers.length; i += 1) {
            placeMarkers[i].setMap(null);
        }
    }

    globalQuery = query;

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

function earnBadge(badgeType) {
    'use strict';

    var tweetString;

    switch (badgeType) {
    case "music":
        tweetString = '<a href="http://ctt.ec/4UTSB"><img src="http://clicktotweet.com/img/tweet-graphic-4.png" alt="Tweet: I earned my music badge from funTron++-! http://ctt.ec/4UTSB+" /></a>';
        tweetString += "You earned your music badge!";
        $('#interestDiv').html(tweetString);
        musicEarned = true;
        break;
    case "food":
        tweetString = '<a href="http://ctt.ec/86Zd9"><img src="http://clicktotweet.com/img/tweet-graphic-4.png" alt="Tweet: I earned my food badge from funTron++-! http://ctt.ec/86Zd9+" /></a>';
        tweetString += "You earned your food badge!";
        $('#interestDiv').html(tweetString);
        foodEarned = true;
        break;
    case "candy":
        tweetString = '<a href="http://ctt.ec/1E9ta"><img src="http://clicktotweet.com/img/tweet-graphic-4.png" alt="Tweet: I earned my candy badge from funTron++-! http://ctt.ec/1E9ta+" /></a>';
        tweetString += "You earned your candy badge!";
        $('#interestDiv').html(tweetString);
        candyEarned = true;
        break;
    case "movies":
        tweetString = '<a href="http://ctt.ec/aM9Hj"><img src="http://clicktotweet.com/img/tweet-graphic-4.png" alt="Tweet: I earned my movie badge from funTron++-! http://ctt.ec/aM9Hj+" /></a>';
        tweetString += "You earned your movie badge!";
        $('#interestDiv').html(tweetString);
        movieEarned = true;
        break;
    default:
        break;
    }
}

function placeVisited() {
    'use strict';
    totalPoints = totalPoints + 1000000;
    var badgesString = ' ',
        bannerString = "Points: " + totalPoints + "&nbsp; &nbsp;";

    switch (globalQuery) {
    case "music":
        musicPoints = musicPoints + 1000000;
        $('#interestDiv').html(' ');
        if (musicPoints === LEVEL_UP) {
            earnBadge(globalQuery);
        }
        break;
    case "food":
        foodPoints = foodPoints + 1000000;
        $('#interestDiv').html(' ');
        if (foodPoints === LEVEL_UP) {
            earnBadge(globalQuery);
        }
        break;
    case "candy":
        candyPoints = candyPoints + 1000000;
        $('#interestDiv').html(' ');
        if (candyPoints === LEVEL_UP) {
            earnBadge(globalQuery);
        }
        break;
    case "movies":
        moviePoints = moviePoints + 1000000;
        $('#interestDiv').html(' ');
        if (moviePoints === LEVEL_UP) {
            earnBadge(globalQuery);
        }
        break;
    default:
        break;
    }

    if (movieEarned) {
        badgesString += '<img src="images/movieBadge.jpg">';
    }
    if (musicEarned) {
        badgesString += '<img src="images/musicBadge.jpg">';
    }
    if (candyEarned) {
        badgesString += '<img src="images/candyBadge.jpg">';
    }
    if (foodEarned) {
        badgesString += '<img src="images/foodBadge.jpg">';
    }
    $('#topBanner').html("<bannerP>" + bannerString + "</bannerP>");
    $('#badgesBanner').html("<bannerP>" + badgesString + "</bannerP>");
}

google.maps.event.addDomListener(window, 'load', initialize);
