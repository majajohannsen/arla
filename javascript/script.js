"use strict";
// Your web app's Firebase configuration
const _firebaseConfig = {
  apiKey: "AIzaSyCMyBxTqrwDePj6kSVgD5rVsEQ-66FCoCk",
  authDomain: "mdu-e18front.firebaseapp.com",
  databaseURL: "https://mdu-e18front.firebaseio.com",
  projectId: "mdu-e18front",
  storageBucket: "mdu-e18front.appspot.com",
  messagingSenderId: "1065294705229",
  appId: "1:1065294705229:web:81f00c89d44d800c75e204"
};
// Initialize Firebase and database references
firebase.initializeApp(_firebaseConfig);
const _db = firebase.firestore();



// ========== GLOBAL VARIABLES ========== //
const _dataRef = _db.collection("sustainabilityData");
let _sustainabilityData;

// 1: data from firebase
// listen for changes on _dataRef
_dataRef.orderBy("year").onSnapshot(snapshotData => {
  _sustainabilityData = []; // reset _sustainabilityData
  snapshotData.forEach(doc => { // loop through snapshotData - like for of loop
    let data = doc.data(); // save the data in a variable
    data.id = doc.id; // add the id to the data variable
    _sustainabilityData.push(data); // push the data object to the global array _sustainabilityData
  });
  console.log(_sustainabilityData);
  appendCows(_sustainabilityData); // call appendCows with _sustainabilityData as function argument
  appendCarbonFootprint(_sustainabilityData); //call appendCarbonFootprint with _sustainabilityData as function argument
  appendMilkProduction(_sustainabilityData); //call appendMilkProduction with _sustainabilityData as function argument
});

// 2: preparing the data
function prepareCowData(sustainabilityData) {
  let cows = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.region === 'north') { // in this case we only want the data from 'north'
      cows.push(data.herdYearCows);
      years.push(data.year);
    }
  });
  return {
    cows,
    years
  }
}
//3: appending the chart
function appendCows(sustainabilityData) {
  let data = prepareCowData(sustainabilityData);
  console.log(data);
  // generate chart
  let chartContainer = document.querySelector('#cows');
  let chart = new Chart(chartContainer, {
    type: 'line',
    data: {
      datasets: [{
        data: data.cows,
        label: 'Number of Cows',
        fill: false,
        borderColor: "#66955C",
        backgroundColor: "#66955C",
        pointBackgroundColor: "#006A38",
        pointBorderColor: "#006A38",
        pointHoverBackgroundColor: "#006A38",
        pointHoverBorderColor: "#006A38",
      }],
      labels: data.years
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: (Math.min(...data.cows) - 5),
            max: (Math.max(...data.cows) + 1)
          }
        }]
      }
    }
  });
}

// 2: preparing the data
function prepareCarbonFootprintData(sustainabilityData) {
  // prepare data
  let carbonFootprint = [];
  let years = [];
  sustainabilityData.forEach(data => {
    if (data.region === 'north') { // in this case we only want the data from 'north'
      carbonFootprint.push(data.carbonFootprintWholeFarm);
      years.push(data.year);
    }
  });

  return {
    carbonFootprint,
    years
  }
}

//3: appending the chart
function appendCarbonFootprint(sustainabilityData) {
  let data = prepareCarbonFootprintData(sustainabilityData);
  console.log(data);

  // generate chart
  let chartContainer = document.querySelector('#carbonFootprint');
  let chart = new Chart(chartContainer, {
    type: 'line',
    data: {
      datasets: [{
        data: data.carbonFootprint,
        label: 'Carbon Footprint WholeFarm',
        fill: false,
        borderColor: "#66955C",
        backgroundColor: "#66955C",
        pointBackgroundColor: "#006A38",
        pointBorderColor: "#006A38",
        pointHoverBackgroundColor: "#006A38",
        pointHoverBorderColor: "#006A38",
      }],
      labels: data.years
    }
  });
}

// 2: preparing the data
function prepareMilkProductionData(sustainabilityData) {
  let years = [];
  let milkNorth = [];
  let milkSouth = [];
  sustainabilityData.forEach(data => {
    if (data.region === 'north') { // condition testing whether the region is 'north' og 'south'
      milkNorth.push(data.herdMilkProduction);
      years.push(data.year);
    } else if (data.region === 'south') {
      milkSouth.push(data.herdMilkProduction);
    }
  });
  return {
    years,
    milkNorth,
    milkSouth
  }
}

//3: appending the chart
function appendMilkProduction(sustainabilityData) {
  let data = prepareMilkProductionData(sustainabilityData);
  console.log(data);

  // generate chart
  let chartContainer = document.querySelector('#milkProduction');
  let chart = new Chart(chartContainer, {
    type: 'line',
    data: {
      datasets: [
        // first dataset - north
        {
          data: data.milkNorth,
          label: 'Milk Production North',
          fill: false,
          borderColor: "#66955C",
          backgroundColor: "#66955C",
          pointBackgroundColor: "#006A38",
          pointBorderColor: "#006A38",
          pointHoverBackgroundColor: "#006A38",
          pointHoverBorderColor: "#006A38",
        },
        // secobd dataset - south
        {
          label: 'Milk Production South',
          data: data.milkSouth,
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
      labels: data.years
    }
  });
}