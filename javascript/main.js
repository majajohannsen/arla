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
  appendFeedConsumption(_carbonData);
});

// MILKPRODUCTION //

// 2: preparing the data carbonFootprint
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
  Chart.defaults.global.defaultFontFamily = 'Arla Interface';
  let chart = new Chart(chartContainer, {
    type: 'line',
    data: {
      datasets: [
        // first dataset - your data
        {
          data: data.yourCarbon,
          label: 'Your Data',
          fill: true,
          pointRadius: 0,
          showLine: true,
          borderWidth: 0,
          backgroundColor: "rgba(102, 149, 92, 0.8)",
          pointBackgroundColor: "#006A38",
          pointBorderColor: "#006A38",
          pointHoverBackgroundColor: "#006A38",
          pointHoverBorderColor: "#006A38",
        },
        // second dataset - national data
        {
          label: 'National Data',
          data: data.nationalCarbon,
          fill: true,
          pointRadius: 0,
          borderWidth: 0,
          backgroundColor: "rgba(102, 149, 92, 0.5)",
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

// FEED CONSUMPTION //


// 2: preparing the data feedConsumption
function prepareFeedConsumption(carbonData) {
  let quarters = [];
  let yourFeed = [];
  let nationalFeed = [];
  carbonData.forEach(data => {
    if (data.dataTypeFeed === 'yourData') { // condition testing whether the dataType is 'yourData' og 'nationalData'
      yourFeed.push(data.feedConsumption);
      quarters.push(data.quarter);
    } else if (data.dataTypeFeed === 'nationalData') {
      nationalFeed.push(data.feedConsumption);
    }
  });
  return {
    quarters,
    yourFeed,
    nationalFeed
  }
}

//3: appending the chart
function appendFeedConsumption(carbonData) {
  let data = prepareFeedConsumption(carbonData);
  console.log(data);

  // generate chart
  let chartContainer = document.querySelector('#feedConsumption');
  Chart.defaults.global.defaultFontFamily = 'Arla Interface';
  let chart = new Chart(chartContainer, {
    type: 'line',
    data: {
      datasets: [
        // first dataset - your data
        {
          data: data.yourFeed,
          label: 'Your Data',
          fill: true,
          pointRadius: 0,
          showLine: true,
          borderWidth: 0,
          backgroundColor: "rgba(102, 149, 92, 0.8)",
          pointBackgroundColor: "#006A38",
          pointBorderColor: "#006A38",
          pointHoverBackgroundColor: "#006A38",
          pointHoverBorderColor: "#006A38",
        },
        // second dataset - national data
        {
          label: 'National Data',
          data: data.nationalFeed,
          fill: true,
          pointRadius: 0,
          borderWidth: 0,
          backgroundColor: "rgba(102, 149, 92, 0.5)",
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




function feedConsumption() {
  document.getElementById('forsvind').style.display = "block";
  document.getElementById('milkProduction').style.display = "none";

}


function carbonFootprint() {
  document.getElementById('forsvind').style.display = "none";
  document.getElementById('milkProduction').style.display = "block";

}