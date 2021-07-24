/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define function that will run on page load
function init() {

  // Read json data

      // Parse and filter data to get sample names

      // Add dropdown option for each sample

  // Call functions below using the first sample to build metadata and initial plots

}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

  // Read the json data

      // Parse and filter the data to get the sample's metadata

      // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {

  // Read the json data

      // Parse and filter the data to get the sample's OTU data
      // Pay attention to what data is required for each chart

      // Create bar chart in correct location

      // Create bubble chart in correct location
  
}


function optionChanged(sample){
  // The parameter being passed in this function is new sample id from dropdown menu

  // Update metadata with newly selected sample

  // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();


// Need to get array of petal lengths and call it x



d3.json("/park").then(response => {

    console.log(response);

    // let x = response;

    // var trace = {
    //     x: x,
    //     type: 'histogram',
    // };

    // var data = [trace];
    // Plotly.newPlot('myDiv', data);
    let park = response
    

    // Define arrays to hold the created city and state markers.
    var cityMarkers = [];
    var stateMarkers = [];
    
    // Loop through locations, and create the city and state markers.
    for (var i = 0; i < locations.length; i++) {
      // Setting the marker radius for the state by passing population into the markerSize function
      stateMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "white",
          fillColor: "white",
          radius: markerSize(locations[i].state.population)
        })
      );
    
      // Set the marker radius for the city by passing the population to the markerSize() function.
      cityMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "purple",
          fillColor: "purple",
          radius: markerSize(locations[i].city.population)
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
    var states = L.layerGroup(stateMarkers);
    var cities = L.layerGroup(cityMarkers);
    
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
    
    // Create an overlay object.
    var overlayMaps = {
      "State Population": states,
      "City Population": cities
    };
    
    // Define a map object.
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, states, cities]
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