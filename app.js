'use strict';

//create products array, it begins as an empty array
var productsArray = [];
//create an array of product names
var allPics = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

//keep track of clicks
var times_clicked = 0;

//collect dom elements in variables
var shell = document.getElementById('shell');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');
var chartDrawn = false;

//constructor for product instances
function Product(name) {
  this.name = name;
  this.pathName = 'images/' + name + '.jpg';
  this.clicked = 0;
  this.views = 0;
}

//loop through array of names
for(var i = 0; i < allPics.length; i++) {
  productsArray.push(new Product(allPics[i]));  
}

//create function to get a random number. we will use it to show a random image.
function randNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//create a display function
var prev = [];
function displayPic() {
  var index1 = randNum(0, productsArray.length);
  pic1.src = productsArray[index1].pathName;
  pic1.alt = productsArray[index1].name;
  productsArray[index1].views +=1;
  prev.push(productsArray[index1].name);

  var index2 = randNum(0, productsArray.length);
  while(index1 === index2){
    index2 = randNum(0, productsArray.length); 
  }
  pic2.src = productsArray[index2].pathName;
  pic2.alt = productsArray[index2].name;
  productsArray[index2].views += 1;
  prev.push(productsArray[index2].name);

  var index3 = randNum(0, productsArray.length);
  while(index2 === index3 || index1 === index3) {
    index3 = randNum(0, productsArray.length);
  }
  pic3.src = productsArray[index3].pathName;
  pic3.alt = productsArray[index3].name;
  productsArray[index3].views += 1;
  prev.push(productsArray[index3].name);
}


shell.addEventListener('click', function handleClick() {
  if(times_clicked < 24){
    if(event.target === shell){
      alert('Please click on an image.');
    }else {
      times_clicked++;
    }
  }else {
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').addEventListener('click', handleButtonClick);

    shell.removeEventListener('click', handleClick);
  }

//increase the clicked count on target image
  for(var j = 0; j < productsArray.length; j++) {
    if(event.target.alt === productsArray[j].name) {
      productsArray[j].clicked += 1;
    } 
  }
  displayPic();
});

var productName = [];
var productClicks = [];

function handleButtonClick() {

  for(var i = 0; i < productsArray.length; i++){
    productName.push(productsArray[i].name);
    productClicks.push(productsArray[i].clicked);
  }

  var data = {
    labels: productName,
    datasets: [
      {
        label: 'Bus Mall Stats',
        backgroundColor: 'rgba(255,9,132,1.2)',
        borderWidth: 3,
        hoverBackgroundColor:'rgba(255,9,32,1)',
        hoverBorderColor:  'rgba(255,99,132,0.4)',
        data: productClicks,
      }
    ]
  };
  drawChart(data);
  // localStorage.setItem(data, JSON.stringify(data));
  localStorage.setItem(productName, productClicks);
}

function hideChart() {
  document.getElementById('canvas').hidden = true;
  document.getElementById('results').hidden = true;
}

function drawChart(data) {
  var ctx = document.getElementById('canvas').getContext('2d');
  var myFirstChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
  document.getElementById('canvas').hidden = false;

  function stats() {
    var tally = document.getElementById('tally');
    for(i = 0; i < productsArray.length; i++) {
      productName.push(productsArray[i].name);
      productClicks.push( productsArray[i].clicked);
      var listEl = document.createElement('p');
      listEl.setAttribute('id', productsArray[i].name);
      var tree = []; 
      tree.push(productsArray[i].name + ': ' + productsArray[i].clicked + ' ');
      listEl.textContent = tree; 
      tally.appendChild(listEl);
    }
  }
  stats();
  document.getElementById('results').removeEventListener('click', handleButtonClick);



}
hideChart();

displayPic();

