// Define function that will run on page load
function init() {

    // Read json data
    d3.json("/activity").then(response => {


        // console.log(response);
        let parkActivity = response;

        // // Parse and filter data to get sample names
        let dropdownMenu = d3.select("#selActivity");

        // // // names.push(data.names);
        for (var i = 0; i < parkActivity.length; i++) {
            dropdownMenu.append("option").text(parkActivity[i].activity).
                property("value", parkActivity[i].activity);
        };

        // console.log(parkActivity[0]);


        //  // Call functions below using the first sample to build metadata and \
        //  //initial plots
        buildMetadata(parkActivity[0]);
        // buildCharts();
        optionChanged(parkActivity[0]);
    });
}

// // Define a function that will create metadata for given sample
function buildMetadata(sample) {


    // Read the json data
    d3.json("/activity").then(response => {

        let metadata = response;

        // console.log(metadata[0]);

        let resultArray = metadata.filter(sampleObject => sampleObject.activity == sample);
        // console.log(resultArray[0]);

        let result = resultArray[0].park_name;
        console.log(result);

        let demoTable = d3.select("#sample-metadata");

        demoTable.html("");

        Object.entries(result).forEach(([key, value]) => {
            demoTable.append("p").text(`${value}`);
        });

    });
}

function buildCharts(sample) {

    // Read the json data
    d3.json("/activity_count").then(response => {

        console.log(response);


        // var trace1 = {
        //     x: ['Liam', 'Sophie', 'Jacob', 'Mia', 'William', 'Olivia'],
        //     y: [8.0, 8.0, 12.0, 12.0, 13.0, 20.0],
        //     type: 'bar',
        //     text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
        //     marker: {
        //       color: 'rgb(142,124,195)'
        //     }
        //   };
          
        //   var data = [trace1];
          
        //   var layout = {
        //     title: 'Number of Graphs Made this Week',
        //     font:{
        //       family: 'Raleway, sans-serif'
        //     },
        //     showlegend: false,
        //     xaxis: {
        //       tickangle: -45
        //     },
        //     yaxis: {
        //       zeroline: false,
        //       gridwidth: 2
        //     },
        //     bargap :0.05
        //   };
          
        //   Plotly.newPlot('bar', data, layout);


        var trace1 = {
            x: response[1].reverse(),
            y: response[3].reverse().map(index=>`(${index})`),
            type: 'bar',
            orientation: "h",
            text: response[2].reverse(),
            marker: {
              color: 'rgb(0,100,0)'
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Most Common Park Activities',
            font:{
              family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
              tickangle: -45
            },
            yaxis: {
              zeroline: false,
              gridwidth: 2
            },
            bargap :0.05,
            height: 575,
          };
          
          Plotly.newPlot('bar', data, layout);

          

        // //Create Bar chart 
        // let trace1 = {
        //     x: 
        //     y: ,
        //     type: "bar",
        //     orientation: "h",
        //     text: response[2].reverse(),
        // };

        // let layout = {
        //     hovermode: 'closest',
        //     title: 'Most Common Park Activities'
        // };

        // let traceData = [trace1];

        // Plotly.newPlot("bar", traceData, layout);

    });
}

function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu
    let dropdownMenu = d3.select("#selActivity");
    let sampleSelected = dropdownMenu.property("value");
    // Update metadata with newly selected sample
    buildMetadata(sampleSelected);
    buildCharts(sampleSelected);

}

// // Initialize dashboard on page load
init();
