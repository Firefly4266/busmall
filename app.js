'use strict';

//create products array, it begins as an empty array
var productsArray = [];
//create an array of product names
var allPics = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog_duck','dragon','pen','pet_sweep','scissors','shark','sweep','tauntaun','unicorn','water_can','wine_glass'];

//collect dom elements in variables
var shell = document.getElementById('shell');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');

//constructor for product instances
function Product(name) {
  this.name = name;
  this.pathName = '/images/*' + '.jpg';
}

//loop through array of names
for(var i = 0; i < allPics.length; i++) {
  console.log(allPics[i]);  
}

//create function to get a random number. we will use it to show a random image.
function randNum(max, min) {
  Math.floor(Math.random() * (max - min)) + min;
}

//create a display function
function displayPic() {
  var index1 = randNum(0, productsArray);
  var index2 = randNum(0, productsArray);
  var index3 = randNum(0, productsArray);
}





