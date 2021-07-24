// Need to get array of lat and lon

d3.json("/park").then(response => {

    console.log(response);

    let park = response;       

// Define arrays to hold the created city and state markers.
// var cityMarkers = [];
var stateMarkers = [];

// Loop through locations, and create the city and state markers.
for (var i = 0; i < park.length; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  stateMarkers.push(
    L.circle(park[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "red",
      fillColor: "red",
      radius: 50000
    })
  );

  // Set the marker radius for the city by passing the population to the markerSize() function.
  // cityMarkers.push(
  //   L.circle(park[i].lat_lon, {
  //     stroke: false,
  //     fillOpacity: 0.75,
  //     color: "purple",
  //     fillColor: "purple",
  //     // radius: markerSize(1000000)
  //   })
  // );
}

// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

// Create two separate layer groups: one for the city markers and another for the state markers.
var states = L.layerGroup(stateMarkers);
// var cities = L.layerGroup(cityMarkers);

// Create a baseMaps object.
var baseMaps = {
  "Street Map": street,
  // "Topographic Map": topo
};

// Create an overlay object.
var overlayMaps = {
  "State Population": states,
  // "City Population": cities
};

// Define a map object.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [street, states]
});

// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

    // let x = response;

    // var trace = {
    //     x: x,
    //     type: 'histogram',
    // };

    // var data = [trace];
    // Plotly.newPlot('myDiv', data);

})