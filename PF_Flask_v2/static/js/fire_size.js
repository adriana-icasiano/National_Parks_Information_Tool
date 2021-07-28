// Function to determine the marker size based on the population
function markerSize(fire_size) {
    return Math.sqrt(fire_size) * 100;
}

d3.json("/wildfires").then(response => {

    console.log(response);
  
    let fire = response;

    let fireSizeMarkers = [];

// Loop through locations, and create the city and state markers.
for (let i = 0; i < fire.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    fireSizeMarkers.push(
      L.circle(fire[i].lat_lon, {
        stroke: false,
        fillOpacity: 0.75,
        color: "red",
        fillColor: "red",
        radius: markerSize(fire[i].fire_size)
      })
    );
}

// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create two separate layer groups: one for the city markers and another for the state markers.
var fires = L.layerGroup(fireSizeMarkers);


// Create a baseMaps object.
var baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create an overlay object.
var overlayMaps = {
  "Fire Size": fires
};

// Define a map object.
var myMap = L.map("size_map", {
  center: [37.09, -95.71],
  zoom: 4,
  layers: [street, fires]
});

// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
});