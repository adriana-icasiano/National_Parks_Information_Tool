function init() {

    d3.json("/species").then(data => {

        let lookup = {};
        let parkAnimals = data;
        let parkNames = [];

        for (let parkAnimal, i = 0; parkAnimal = parkAnimals[i++];) {
            let park_name = parkAnimal.park_name;

            if (!(park_name in lookup)) {
                lookup[park_name] = 1;
                parkNames.push(park_name)
            };
        };
        // console.log(parkNames);

        let newDropdown = d3.select("#selParkCount");
        parkNames.forEach(function (park) {
            newDropdown.append("option").text(park).property("value");
        });
        buildChart(parkNames[0]);
    });
}

function buildChart(park_name) {

    d3.json("/species").then(data => {

    let resultPark = data.filter(obj => obj.park_name === park_name);
    // console.log(resultPark);

    // Get Species Count by Park
    let res = resultPark.reduce(function (obj, v) {

        obj[v.category_name] = (obj[v.category_name] || 0) + 1;
        return obj;
    }, {})
    // console.log(res);

    // Building Chart
    Highcharts.chart("myChart", {

        chart: {
            type: 'item'
        },
    
        title: {
            text: "Number of Species Per Park"
        },
    
        subtitle: {
            text: "Amphibians, Birds, Mammals & Reptiles"
        },
    
        legend: {
            labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
        },
    
        series: [{
            name: "Unique Species",
            keys: ["name", "y", "color", "label"],
            data: [
                ["Mammals", res.Mammal, "#009EE0", "MAMMALS"],
                ["Birds", res.Bird, "#EB001F", "BIRDS"],
                ["Amphibians", res.Amphibian, "#64A12D", "AMPHIBIANS"],
                ["Reptiles", res.Reptile, "#FFED00", "REPTILES"]
            ],
            dataLabels: {
                enabled: true,
                format: '{point.label}'
            },
    
            // Circular options
            center: ['50%', '88%'],
            size: '170%',
            startAngle: -100,
            endAngle: 100
        }]
    });


    });

}

function parkChanged(newPark_name) {

    buildChart(newPark_name);

}

init();