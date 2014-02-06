function initialize() {

        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
          center: new google.maps.LatLng(44.65742,-63.573868),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		
        var map = new google.maps.Map(map_canvas, map_options);
		
		map.set('styles', [
			{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
				{ color: '#000000' },
				{ weight: 1.0 }
			]
			}, {
			featureType: 'road',
			elementType: 'labels',
			stylers: [
				{ saturation: -100 },
				{ invert_lightness: true }
			]
			}, {
			featureType: 'landscape',
			elementType: 'geometry',
			stylers: [
				{ hue: '#ffff00' },
				{ gamma: 1.4 },
				{ saturation: 82 },
				{ lightness: 96 }
			]
			}, {
			featureType: 'poi.school',
			elementType: 'geometry',
			stylers: [
				{ hue: '#fff700' },
				{ lightness: -15 },
				{ saturation: 99 }
			]
			}
		]);
}

google.maps.event.addDomListener(window, 'load', initialize);
