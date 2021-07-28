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
            let category_name = d3.select("#speciesDropdown").node().value;
            // console.log(category_name);
        });

        parkFilter(parkNames[0], category_name);

    });
}

function parkFilter(park_name, category_name) {

    d3.json("/species").then(data => {

        let result = data.filter(obj => obj.park_name === park_name
            && obj.category_name === category_name);
        console.log(result);

        let lookup = {};
        let parkAnimalOrders = result;
        let animalOrder = [];

        for (let parkAnimalOrder, i = 0; parkAnimalOrder = parkAnimalOrders[i++];) {
            let orderName = parkAnimalOrder.order;

            if (!(orderName in lookup)) {
                lookup[orderName] = 1;
                animalOrder.push(orderName)
            };
        };
        // console.log(animalOrder);
        for (let i = 0; i < animalOrder.length; i++) {
            console.log(animalOrder[i]);

            let dropdown3 = d3.select("#orderDropdown");
            dropdown3.html("");
            animalOrder.forEach(function (order) {
                dropdown3.append("option").text(order).property("value");

                // let orderObj = document.getElementById("orderDropdown");
                // console.log(orderObj);
                // let ordr = orderObj.querySelectorAll("option");
                // if (ordr === result.order){
                //     return result;
                // }
            });



        }

        // document.getElementById("orderPrint").innerHTML = animalOrder.join("<br>");

    });
}

function optionChanged(newCategory_name) {

    // Updating dropdown
    let park_name = d3.select("#selDataset").node().value;
    console.log(park_name);
    parkFilter(park_name, newCategory_name);
    console.log(newCategory_name);

}

init();