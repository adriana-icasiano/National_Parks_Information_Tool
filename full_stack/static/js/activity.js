// Define function that will run on page load
function init() {

    // Read json data
    d3.json("/activity").then(response => {

        // Set variable for response
        let parkActivity = response;

        // Parse and filter data to get sample names
        let dropdownMenu = d3.select("#selActivity");

        // For each item in the park Activity data, add it to the menu drop down
        for (var i = 0; i < parkActivity.length; i++) {
            dropdownMenu.append("option").text(parkActivity[i].activity).
                property("value", parkActivity[i].activity);
        };



        //  // Call functions below using the first sample to build metadata and \
        //  //initial plots
        buildMetadata(parkActivity[0]);

        // when option changes;
        optionChanged(parkActivity[0]);
    });
}

// // Define a function that will create metadata for given sample
function buildMetadata(sample) {


    // Read the json data
    d3.json("/activity").then(response => {

        // set variable for response
        let metadata = response;

        // set variable to to filter data for activity that matches the user's choice of activity
        let resultArray = metadata.filter(sampleObject => sampleObject.activity == sample);

        // set variable for park name
        let result = resultArray[0].park_name;

        // select the dropdown table
        let demoTable = d3.select("#sample-metadata");

        // convert table to html
        demoTable.html("");

        // For each item in the result that matches the user's choice of activity, print the park name
        Object.entries(result).forEach(([key, value]) => {
            demoTable.append("p").text(`${value}`);
        });

    });
}

function buildCharts(sample) {

    // Read the json data
    d3.json("/activity_count").then(response => {

        // Create horizional bar chart
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

    });
}

function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu
    let dropdownMenu = d3.select("#selActivity");

    // Set variable for dropdown selection
    let sampleSelected = dropdownMenu.property("value");

    // Update metadata with newly selected sample
    buildMetadata(sampleSelected);
    
    // Update chart with newly selected sample
    buildCharts(sampleSelected);

}

// // Initialize dashboard on page load
init();
