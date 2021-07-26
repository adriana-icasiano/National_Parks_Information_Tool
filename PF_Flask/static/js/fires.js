// Need to get array of lat and lon


d3.json("/wildfires").then(response => {

  console.log(response);

  let fire = response;


  var fireMarkers = [];

  var markers = L.markerClusterGroup();
  // Loop through the data.
  for (var i = 0; i < fire.length; i++) {
    // Set the data location property to a variable.
    var location = response[i].lat_lon;
    

    // Check for the location property.
    if (location) {

    // Add a new marker to the cluster group, and bind a popup.
    markers.addLayer(L.marker(fire[i].lat_lon)
    .bindPopup(`<h1>${fire[i].park_name}</h1> <hr> <h3>Fire cause: ${fire[i].cause_description}</h3>
    <hr> <h3>Fire size: ${fire[i].fire_size}</h3> <hr> <h3>Fire class: ${fire[i].fire_size_class}</h3>`));
  }

};


// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create two separate layer groups: one for the city markers and another for the state markers.
var fires = L.layerGroup(fireMarkers);
// var cities = L.layerGroup(cityMarkers);

// Create a baseMaps object.
var baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create an overlay object.
var overlayMaps = {
  "Fires": fires,
};


// Define a map object.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [street, fires]
});

// Add our marker cluster layer to the map.
myMap.addLayer(markers);

// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

});