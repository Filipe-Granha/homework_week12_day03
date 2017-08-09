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