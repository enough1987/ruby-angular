// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple


// http://ip-api.com/
// http://ip-api.com/json/?fields=country

;(function(){


    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyANe5pqxsDBBzsdg0BQzGU4r7TwChAz9vQ&signed_in=true&libraries=places&language=en&callback=initMap"; 
    var head = document.getElementsByTagName('head')[0];    
    head.appendChild(script);  

})() ; 

window.setTimeout(function() {

   var input = document.getElementById('googleaddress');
   var autocomplete = new google.maps.places.Autocomplete(input);

}, 2000);



function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.30, lng: 0.10},
    zoom: 7,
	  scrollwheel:        false,
    zoomControl:        false,
    mapTypeControl:     false,
    scaleControl:       false,
    streetViewControl:  false,
    rotateControl:      false
  });
  map.setZoom( map.getZoom() + 8 );
  var geocoder = new google.maps.Geocoder();
  console.log( ' zoom: ' +  ( map.getZoom() + 8) );
  document.getElementById('googleaddress').addEventListener('keyup', function() {
    //console.log('geocoder + map');
    geocodeAddress(geocoder, map);
  });
  document.getElementById('googleaddress').addEventListener('input', function() {
    //console.log('geocoder + map');
    geocodeAddress(geocoder, map);
  });
  document.getElementById('map').addEventListener('mousemove', function() {
    //console.log('geocoder + map');
    geocodeAddress(geocoder, map);
    console.log( 'map mousemove', document.getElementById('googleaddress').value );
  })
  document.getElementById('map-wrap').addEventListener('mousemove', function() {
    //console.log('geocoder + map');
    geocodeAddress(geocoder, map);
    console.log( 'map-wrap mousemove', document.getElementById('googleaddress').value );
  });

/*
  document.getElementById('googleaddress').addEventListener('change', function() {
    console.log('geocoder + map');
    geocodeAddress(geocoder, map);
  });
  document.getElementById('googlesubmit').addEventListener('click', function() {
    console.log('geocoder + map');
    geocodeAddress(geocoder, map);
  });
*/
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('googleaddress').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      //console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

    
