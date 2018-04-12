const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers)
};

const populateList = function(beers){
  const select = document.getElementById('beer-list');
  beers.forEach(function(beer, index){
    let option = document.createElement('option')
    option.innerText = beer.name
    option.value = index
    select.appendChild(option);
  })
  select.addEventListener('change', function(event){
    var index = this.value;
    var beer = beers[index];
    localStorage.setItem('beer', JSON.stringify(beer))
    updateDisplay(beer);
  })
}

const updateDisplay = function(beer){
    const ul = document.getElementById('chosen-beer-list');
    const name = document.getElementById('name');
    name.innerText = beer.name;
    const description = document.getElementById('description');
    description.innerText = beer.description;
    const image = document.getElementById('image');
    image.src = beer.image_url;      
    ul.appendChild(name);
    ul.appendChild(description);
    ul.appendChild(image);

}

var app = function(){
  const url ='https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
  let prevBeer = JSON.parse(localStorage.getItem('beer'));
  updateDisplay(prevBeer);
}

window.addEventListener('load', app);
