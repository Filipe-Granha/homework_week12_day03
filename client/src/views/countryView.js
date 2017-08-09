var CountryView = function(countries){
  this.render(countries);
}

CountryView.prototype = {
  render: function(countries){
    
    console.log(countries);
    countries.forEach( function(country){
      var li = document.createElement('li');
      var text = document.createElement('p');
      var ul = document.getElementById('countries');
      text.innerText = country.name;
      li.appendChild(text);
      ul.appendChild(li);
    })
  }
} 

 module.exports = CountryView; 