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

        let dropdown1 = d3.select("#selDataset");
        parkNames.forEach(function (park) {
            dropdown1.append("option").text(park).property("value");
        });
        
        let category_name = ""
        
        d3.select("select").on("change", function (i) {
            category_name = d3.select("#speciesDropdown").node().value;
            // console.log(category_name);
        });

        parkFilter(parkNames[0], category_name);
        // animalCategory(category_name);

    });
}

function parkFilter(park_name, category_name) {

    d3.json("/species").then(data => {

        let result = data.filter(obj => obj.park_name === park_name && obj.category_name === category_name);
        console.log(result);

    });
}

function optionChanged(newCategory_name) {

    // Updating dropdown
    let park_name = d3.select("#selDataset").node().value;
    console.log(park_name);
    parkFilter(park_name, newCategory_name);
}

init();

// Mammals in Acadia National Park 
// d3.json("/species").then(data => {
//     let parkmammalObjs = data.filter(obj1 => {

//         return obj1.park_name === "Acadia National Park" && obj1.category_name === "Mammal";

//     });
//     console.log(parkmammalObjs);
// });

// Birds in Acadia National Park 
// d3.json("/species").then(data => {
//     let parkbirdObjs = data.filter(obj1 => {

//         return obj1.park_name === "Acadia National Park" && obj1.category_name === "Bird";

//     });
//     console.log(parkbirdObjs);
// });

// Reptiles in Acadia National Park 
// d3.json("/species").then(data => {
//     let parkreptileObjs = data.filter(obj1 => {

//         return obj1.park_name === "Acadia National Park" && obj1.category_name === "Reptile";

//     });
//     console.log(parkreptileObjs);
// });

// Amphibians in Acadia National Park 
// d3.json("/species").then(data => {
//     let parkamphObjs = data.filter(obj1 => {

//         return obj1.park_name === "Acadia National Park" && obj1.category_name === "Amphibian";

//     });
//     console.log(parkamphObjs);
// });


// Highcharts.chart('container', {

//     chart: {
//         type: 'item'
//     },

//     title: {
//         text: 'Acadia National Park'
//     },

//     subtitle: {
//         text: 'Animal Classification'
//     },

//     legend: {
//         labelFormat: '{name} <span style="opacity: 0.4">{y}</span>'
//     },

//     series: [{
//         name: 'Species',
//         keys: ['name', 'y', 'color', 'label'],
//         data: [
//             ['Mammals', 37, '#BE3075', 'MA'],
//             ['Bird', 214, '#EB001F', 'BRD'],
//             ['Reptile', 7, '#64A12D', 'REP'],
//             ['Amphibian', 11, '#FFED00', 'AMPHI']
//         ],
//         dataLabels: {
//             enabled: true,
//             format: '{point.label}'
//         },

//         // Circular options
//         center: ['50%', '88%'],
//         size: '170%',
//         startAngle: -100,
//         endAngle: 100
//     }]
// });



