var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
//   var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
  
  d3.json("/wildfires").then(function(response) {
  
    console.log(response);
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].lat_lon;
  
      if (location) {
        heatArray.push(location);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 30,
      blur: 5
    }).addTo(myMap);
  
  });


// // Need to get array of lat and lon


// d3.json("/wildfires").then(response => {

//     console.log(response);
  
//     // let fire = response;

//     var heatArray = [];

//     for (var i = 0; i < response.length; i++) {
//         var location = response[i].lat_lon;

//         if (location) {
//          heatArray.push(location[i]);
//         }
//     }
//     var heat = L.heatLayer(heatArray, {
//         radius: 20,
//         blur: 35
//     }).addTo(myMap);
//   });
  
  
//   // Create the base layers.
//   var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   })
  
//   var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   });
  
//   // Create two separate layer groups: one for the city markers and another for the state markers.
// //   var fires = L.layerGroup(fireMarkers);
//   // var cities = L.layerGroup(cityMarkers);
  
//   // Create a baseMaps object.
//   var baseMaps = {
//     "Street Map": street,
//     "Topographic Map": topo
//   };
  
// //   // Create an overlay object.
// //   var overlayMaps = {
// //     "Fires": fires,
// //   };
    
  
//   // Define a map object.
//   var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5,
//     // layers: [street, heat]
//   });
  
  

// //   // Add our marker cluster layer to the map.
// //   myMap.addLayer(markers);
  
//   // Pass our map layers to our layer control.
//   // Add the layer control to the map.
//   L.control.layers(baseMaps, {
//   }).addTo(myMap);
  
