"use strict";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let _firebaseConfig = {
  apiKey: "AIzaSyA2tgrFrgD_lynuFZe1pEAIvyj5VuWO2mw",
  authDomain: "arla-efda1.firebaseapp.com",
  databaseURL: "https://arla-efda1.firebaseio.com",
  projectId: "arla-efda1",
  storageBucket: "arla-efda1.appspot.com",
  messagingSenderId: "125864658422",
  appId: "1:125864658422:web:301bfaf5d676ae19e033d7",
  measurementId: "G-QS3H91LYXL"
};
// Initialize Firebase
firebase.initializeApp(_firebaseConfig);
firebase.analytics();
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
  appendMilkProduction(_sustainabilityData); //call appendMilkProduction with _sustainabilityData as function argument
});



// 2: preparing the data
function prepareMilkProductionData(sustainabilityData) {
  let quarter = [];
  let yourData = [];
  let nationalData = [];
  sustainabilityData.forEach(data => {
    if (data.region === 'north') { // condition testing whether the region is 'north' og 'south'
      yourData.push(data.carbonFootprint);
      quarter.push(data.year);
    } else if (data.region === 'south') {
      nationalData.push(data.carbonFootprint);
    }
  });
  return {
    quarter,
    yourData,
    nationalData
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
          data: data.yourData,
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
          data: data.nationalData,
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
      labels: data.quarter
    }
  });
}