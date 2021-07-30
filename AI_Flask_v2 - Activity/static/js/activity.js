    // Define function that will run on page load
    function init() {

        // Read json data
        d3.json("/activity").then(response => {
         
    
            // console.log(response);
            let parkActivity = response;

        // // Parse and filter data to get sample names
        let dropdownMenu = d3.select("#selDataset");
        
        // // // names.push(data.names);
        for (var i = 0; i < parkActivity.length; i++) {
            dropdownMenu.append("option").text(parkActivity[i].activity).
            property("value",parkActivity[i].activity);
         };
        
        console.log(parkActivity[0]);
    
       
        //  // Call functions below using the first sample to build metadata and \
        //  //initial plots
        buildMetadata(parkActivity[0]);
        // buildGauge(samples[0]);
        optionChanged(parkActivity[0]);
        });
    }
    
    // // Define a function that will create metadata for given sample
    function buildMetadata(sample) {
    
        
        // Read the json data
        d3.json("/activity").then(response => {
        
        let metadata = response;
        
        console.log(metadata[0]);
        
        let resultArray = metadata.filter(sampleObject => sampleObject.activity == sample);
        console.log(resultArray);
        let result = resultArray[0].park_name;
        console.log(result);
        let demoTable = d3.select("#sample-metadata");
    
        demoTable.html("");
    
        Object.entries(result).forEach(([key, value]) =>{
            demoTable.append("p").text(`${value}`);
        });   
    
    }); 
    }
    
    function buildCharts(sample) {
    
         // Read the json data
         d3.json("/activity_count").then(response =>  {
       
            // let act_count_data = response;
        
            console.log(response);


        // let resultArray = metadata.filter(sampleObject => sampleObject.id == sample);
        
        let name = response.activity;
        // console.log(name);
        let act_count = response.count;
        // console.log(act_counts);
        
    // //     //Create Bar chart 
           
    //     console.log(`otuIDs ${topOtuIds} sample_values ${topSampleValues} Labels ${topOtuLabels}`);
    //     console.log(topOtuIds);
    //     console.log(topSampleValues);
        let trace1 = {
            x: name,
            y: act_count,
            type: "bar",
            orientation: "h"
        };
            
        let layout = {
            hovermode:'closest',
            title: 'Most Common Park Activities'
         };
    
        let traceData = [trace1];
    
        Plotly.newPlot("bar", traceData, layout);
    
        
    }); 
    }
    
    function optionChanged(sample) {
        // The parameter being passed in this function is new sample id from dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        let sampleSelected = dropdownMenu.property("value");
        // Update metadata with newly selected sample
        buildMetadata(sampleSelected);
        buildCharts(sampleSelected);
    
    }
    
    // // Initialize dashboard on page load
    init();
    