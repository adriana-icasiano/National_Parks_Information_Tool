function init() {
  d3.json("/park").then(response => {

    console.log(response);

    let park = response;

    // Define arrays to hold the created city and state markers.
    var parkMarkers = [];

    // Loop through locations, and create the city and state markers.
    for (var i = 0; i < park.length; i++) {
      // Setting the marker radius for the state by passing population into the markerSize function
      parkMarkers.push(
        L.circle(park[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "green",
          fillColor: "green",
          radius: 10000
        })
      );
    }

    var freeMarkers = [];

    for (var i = 0; i < park.length; i++) {
      // console.log(park[i].fee);

      if (park[i].fee == false) {
        console.log(park[i].fee);

        freeMarkers.push(L.circle(park[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "purple",
          fillColor: "purple",
          radius: 10000
        })
        )

      }
    }

    var paidMarkers = [];

    for (var i = 0; i < park.length; i++) {
      // console.log(park[i].fee);

      if (park[i].fee == true) {
        console.log(park[i].fee);

        paidMarkers.push(L.circle(park[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "dark brown",
          fillColor: "dark brown",
          radius: 10000
        })
        )

      }
    }
    var markers = L.markerClusterGroup();

    // Loop through the data.
    for (var i = 0; i < park.length; i++) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker(park[i].coordinates)
        .bindPopup(`<h3>${park[i].park_name}</h3> <hr> 
    <h5> Directions URL: </h5> <a href= ${park[i].directions_url} target="_blank">Visit Directions Website</a>
    <br> <h5> Park URL: </h5> <a href= ${park[i].park_url} target="_blank">Visit Park Website</a>
    <br> <h5> State(s):</h5> ${park[i].states} 
    <br> <h5>Park Description:</h5> ${park[i].description}
    <br> <h5>Weather Info:</h5> ${park[i].weather_info} 
    <br> <h5>Direction Info:</h5> ${park[i].directions_info}
    <br> <h5>Park Designation:</h5> ${park[i].designation}`, {
   maxWidth: 600,
   maxHeight: 300,
    }));
    };

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create two separate layer groups: one for the city markers and another for the state markers.
    var parks = L.layerGroup(parkMarkers);
    var free = L.layerGroup(freeMarkers);
    var paid = L.layerGroup(paidMarkers);

    // Create a baseMaps object.
    var baseMaps = {
      "Topographic Map": topo,
      "Street Map": street

    };

    // Create an overlay object.
    var overlayMaps = {
      "National Parks": parks,
      "Free Parks": free,
      "Paid Parks": paid,
    };


    // Define a map object.
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 4,
      layers: [topo, parks]
    }).addLayer(markers);

    // Pass our map layers to our layer control.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);


  });
}


  // Initialize dashboard on page load
init();