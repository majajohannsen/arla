"use strict";
// ========== GLOBAL VARIABLES ========== //
const _dataRef = _db.collection("carbonData");
let _carbonData;

// 1: data from firebase
// listen for changes on _dataRef
_dataRef.orderBy("quarter").onSnapshot(snapshotData => {
  _carbonData = []; // reset _carbonData
  snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
    let data = doc.data(); // save the data in a variable
    data.id = doc.id; // add the id to the data variable
    _carbonData.push(data); // push the data object to the global array _carbonData
  });
  console.log(_carbonData);
  appendMilkProduction(_carbonData); //call appendMilkProduction with _carbonData as function argument
});



// 2: preparing the data
function prepareMilkProductionData(carbonData) {
  let quarters = [];
  let yourCarbon = [];
  let nationalCarbon = [];
  carbonData.forEach(data => {
    if (data.dataType === 'yourData') { // condition testing whether the dataType is 'yourData' og 'nationalData'
      yourCarbon.push(data.carbonFootprint);
      quarters.push(data.quarter);
    } else if (data.dataType === 'nationalData') {
      nationalCarbon.push(data.carbonFootprint);
    }
  });
  return {
    quarters,
    yourCarbon,
    nationalCarbon
  }
}

//3: appending the chart
function appendMilkProduction(carbonData) {
  let data = prepareMilkProductionData(carbonData);
  console.log(data);

  // generate chart
  let chartContainer = document.querySelector('#milkProduction');
  let chart = new Chart(chartContainer, {
    type: 'line',
    data: {
      datasets: [
        // first dataset - your data
        {
          data: data.yourCarbon,
          label: 'Your Data',
          fill: false,
          borderColor: "#66955C",
          backgroundColor: "#66955C",
          pointBackgroundColor: "#006A38",
          pointBorderColor: "#006A38",
          pointHoverBackgroundColor: "#006A38",
          pointHoverBorderColor: "#006A38",
        },
        // second dataset - national data
        {
          label: 'National Data',
          data: data.nationalCarbon,
          fill: false,
          borderColor: "#006A38",
          backgroundColor: "#006A38",
          pointBackgroundColor: "#66955C",
          pointBorderColor: "#66955C",
          pointHoverBackgroundColor: "#66955C",
          pointHoverBorderColor: "#66955C",
          type: 'line'
        }
      ],
      labels: data.quarters
    }
  });
}

