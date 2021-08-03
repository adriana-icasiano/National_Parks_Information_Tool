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

        parkFilter(parkNames[0], category_name, "");

    });
}

function parkFilter(park_name, category_name, order_name) {
    let ordr = order_name;
    d3.json("/species").then(data => {

        let result = data.filter(obj => obj.park_name === park_name
            && obj.category_name === category_name);
        // console.log(result);

        let lookup = {};
        let parkAnimalOrders = result;
        let animalOrder = [];

        if (order_name == "") {
            // console.log("inside if");
            for (let parkAnimalOrder, i = 0; parkAnimalOrder = parkAnimalOrders[i++];) {
                let orderName = parkAnimalOrder.order;

                if (!(orderName in lookup)) {
                    lookup[orderName] = 1;
                    animalOrder.push(orderName)
                };
            };
            // console.log(animalOrder);
            for (let i = 0; i < animalOrder.length; i++) {
                // console.log(animalOrder[i]);

                let dropdown3 = d3.select("#orderDropdown");
                dropdown3.html("");
                animalOrder.forEach(function (order) {
                    dropdown3.append("option").text(order).property("value", order);

                });
            }
            ordr = d3.select("#orderDropdown").node().value;
        }

        console.log(park_name, category_name, ordr);
        let result_data = data.filter(obj => obj.park_name === park_name
            && obj.category_name === category_name && obj.order === ordr);

        // console.log(result_data);

        // Cleaning result_data
        let myObj = result_data;
       
        myObj.forEach(function (v) {
            delete v.category_name;
            delete v.park_name;
            delete v.park_id;
            delete v.order;
        });
        console.log(myObj);

        createTable (myObj, ["family", "common_names", "sci_name"]);

        // // document.getElementById("orderPrint").innerHTML = animalOrder.join("<br>");
    });
}

function createTable (data, columns) {
    let table = d3.select('#table');
    table.html("");
    table.append('table');
    let thead = table.append('thead');
    let	tbody = table.append('tbody');
    
    // append the header row
    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
        .text(function (column) { return column; });

    // create a row for each object in the data
    let rows = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');

    // create a cell in each row for each column
    let cells = rows.selectAll('td')
      .data(function (row) {
        return columns.map(function (column) {
          return {column: column, value: row[column]};
        });
      })
      .enter()
      .append('td')
        .text(function (d) { return d.value; });
    
  return table;
  
}

function orderChange(order_Name) {
    let park_name = d3.select("#selDataset").node().value;
    let category_name = d3.select("#speciesDropdown").node().value;
    // console.log(order_Name);
    parkFilter(park_name, category_name, order_Name);

}

function speciesChanged(newCategory_name) {

    // Updating dropdown
    let park_name = d3.select("#selDataset").node().value;
    console.log(park_name);
    parkFilter(park_name, newCategory_name, "");
    console.log(newCategory_name);

}

init();