var populateList = function(spotifyData){
  var display = document.getElementById('albums');
  display.innerText = "";
  spotifyData.forEach(function(album){
    var pTag = document.createElement('p');
    var link = document.createElement('a');
    var hr = document.createElement('HR');
    var detail = album.artists[0].name;
    pTag.innerText = album.name + " by " + detail;
    pTag.style.cssText = "text-decoration:none;font-family: Oswald;font-weight: bold;color: ivory;";
    link.href = album.external_urls.spotify;
    link.style.cssText = "text-decoration:none";
    console.log(link.href);
    pTag.appendChild(hr);
    link.appendChild(pTag);
    display.appendChild(link);
  });
}

var newRequest = function(url, callback){
  request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var results = JSON.parse(jsonString);
  var found = results.albums.items;
  populateList(found);
  console.log(found);
}

var app = function(){
  var searchInput = document.getElementById('search-query');
  searchInput.onkeyup = function(){
  var url = "https://api.spotify.com/v1/search?q=" + searchInput.value +"&type=album";
  newRequest(url, requestComplete);
}
}

window.onload = app;