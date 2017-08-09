var CountryView = require('./views/countryView');
var MapWrapper = require('./views/mapWrapper');
var center = {lat: 51.512245, lng: -0.127417};




var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var locations = [];

var requestComplete = function() {
  if(this.status !== 200) return;
  var countryString = this.responseText;
  var countries = JSON.parse(countryString);
  var countryView = new CountryView(countries); 
  var coords = JSON.parse(countryString);

    var coorders = function(coords) {
      coords.forEach(function(coord) {
        
        var posloc = {
          lat: coord.lat,
          lng: coord.lng
        }
        
        locations.push(posloc);


      })
    }

  console.log(countries);
}


var app = function(){
  var mapDiv = document.querySelector("#main-map"); 
  var url = "http://localhost:3000/countries";
  makeRequest(url, requestComplete);

  var main_map = new MapWrapper(mapDiv, center, 1);
  // main_map.addMarker(center);

  var options = {
    types: ['(cities)']
  };

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('country-search'));
  autocomplete.addListener('place_changed', function() {
 var place = autocomplete.getPlace();

    var pos = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
   }

   var inputLat = document.querySelector('#lat');
   inputLat.value = pos.lat;

   var inputLng = document.querySelector('#lng');
   inputLng.value = pos.lng;

   center = pos;
   main_map.changeCenter(pos);
   main_map.addMarker(pos);
   // main_map.addMarker(pos);

   
   console.log(main_map);
  
  }) 


}


window.addEventListener('load', app); 

//added, not breaking
module.exports = app;