// Read the json data
d3.json("/wildfires").then((data) => {
    // BONUS: GAUGE CHART
    sampleData = data.metadata;
    buildArray = sampleData.filter(sampleItem => sampleItem.id == sample);
    console.log(buildArray)
    response = buildArray[0];
    // Gauge Chart to plot weekly washing frequency
    let guageChart = d3.select("#gauge");
    guageChart.html("");
    // console.log(response);
    let washFreq = response.wfreq;
    console.log(washFreq);
    let trace3 = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "<b>Wildfire Size </b><br> (in Acres)" },
        type: "indicator",
        mode: "gauge+number+delta",
        gauge: {
        axis: { range: [0,500000] },
        bar: { color: "darkblue" },
        steps: [
            { range: [0, .25], color: "white" },
            { range: [.251, 9.9], color: "ivory" },
            { range: [10, 99.9], color: "lightyellow" },
            { range: [100, 299.9], color: "palegoldenrod" },
            { range: [300, 999.9], color: "khaki" },
            { range: [1000, 4999.9], color: "yellow" },
            { range: [5000, 500000], color: "gold" },
            ],
        threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: washFreq
            }
        }
        }
    ];
    let layout3 = {  width: 600,
                    height: 400,
                    margin: { t: 0, b: 0 },
                        };
    // Plot using Plotly
    Plotly.newPlot('gauge', trace3, layout3);
    });