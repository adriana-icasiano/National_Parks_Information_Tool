// A function to determine the marker size based on the population
function markerSize(fire_size) {
    return Math.sqrt(fire_size) * 50;
}

d3.json("/wildfires").then(response => {

    console.log(response);

    let firesize = response;

    // Define arrays to hold the created city and state markers.
    var fireSize = [];

    // Loop through locations, and create the city and state markers.
    for (var i = 0; i < firesize.length; i++) {
        // Set the marker radius for the state by passing the population to the markerSize() function.
        fireSize.push(
            L.circle(firesize[i].lat_lon, {
                stroke: false,
                fillOpacity: 0.75,
                color: "white",
                fillColor: "white",
                radius: markerSize(firesize[i].fire_size)
            })
        );
// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create two separate layer groups: one for the city markers and another for the state markers.
    let fires = L.layerGroup(fireSize);

    // Create a baseMaps object to contain the streetmap and the darkmap.
    let baseMaps = {
    "Street": street,
    "Topographical": topo
    };
    // Create an overlayMaps object to contain the "State Population" and "City Population" layers
    let overlayMaps = {
    "Fire Size": fires
    };


    // Modify the map so that it has the streetmap, states, and cities layers
    let myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 3,
    layers: [street, fires]
    });

    // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);

});
