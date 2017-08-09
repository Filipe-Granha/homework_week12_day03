/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var CountryView = function(countries){
  this.render(countries);
}

CountryView.prototype = {
  render: function(countries){
    
    console.log(countries);
    countries.forEach( function(country){
      var li = document.createElement('li');
      var text = document.createElement('p');
      var ul = document.getElementById('countries');
      text.innerText = country.name;
      li.appendChild(text);
      ul.appendChild(li);
    })
  }
} 

 module.exports = CountryView; 

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var MapWrapper = function(mapDiv, coords, zoom){
 var mapDiv = document.getElementById("main-map");

 
 this.googleMap = new google.maps.Map(mapDiv, {
   center: coords,
   zoom: zoom 
 });

 

}

var markers = [];

MapWrapper.prototype = {
  changeCenter: function(center) {
    this.googleMap.setCenter(center);
    this.googleMap.setZoom(5);
  },

  addMarker: function(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    })
    markers.push(marker)
    console.log(markers)
  }
}


module.exports = MapWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var CountryView = __webpack_require__(0);
var MapWrapper = __webpack_require__(1);
var center = {lat: 30.512245, lng: -0.127417};




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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map