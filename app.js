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

//possible function eliminating the need to duplicate existing code.

// function displayPic() {
//   this.src = productsArray[this.index].pathName;
//   this.alt = productsArray[this.index].name;
//   productsArray[this.index].views +=1;
// }

function displayPic() {
  var index1 = randNum(0, productsArray.length);
  pic1.src = productsArray[index1].pathName;
  pic1.alt = productsArray[index1].name;
  productsArray[index1].views +=1;

  var index2 = randNum(0, productsArray.length);
  while(index1 === index2){
    index2 = randNum(0, productsArray.length);   
  }
  pic2.src = productsArray[index2].pathName;
  pic2.alt = productsArray[index2].name;
  productsArray[index2].views += 1;

  var index3 = randNum(0, productsArray.length);
  while(index2 === index3 || index1 === index3) {
    index3 = randNum(0, productsArray.length);
  }
  pic3.src = productsArray[index3].pathName;
  pic3.alt = productsArray[index3].name;
  productsArray[index3].views += 1;
}


shell.addEventListener('click', function handleClick() {
  if(times_clicked < 5){
    if(event.target === shell){
      alert('Please click on an image.');
    }else {
      times_clicked++;
    }
  }else {
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

function handleButtonClick() {
  var productName = [], productClicks = [];

  for( i = 0; i < productsArray.length; i++){
    productName.push(productsArray[i].name);
    productClicks.push(productsArray[i]).clicked;
  }


  function stats() {
    document.getElementById('stats');
    for(var i = 0; i < productsArray.length; i++) {
      productName.push(productsArray[i].name);
      productClicks.push( productsArray[i].clicked);
    }
    
  }
  stats();

}
displayPic();

