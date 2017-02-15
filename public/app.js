
var app = function(){
  var newRequest = function(url, callback){
    request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  }

  var requestComplete = function(){
    if(this.status != 200) return;
    var jsonString = this.responseText;
    var spotifyData = JSON.parse(jsonString);
    populateList(spotifyData.albums.items);
  }

  var populateList = function(spotifyData){
    var display = document.getElementById('albums');
    spotifyData.forEach(function(album){
      var pTag = document.createElement('p');
      var link = document.createElement('a');
      var hr = document.createElement('HR');
      pTag.innerText = album.name;
      pTag.style.cssText = "text-decoration:none;font-family: Oswald;font-weight: bold;color: ivory;";
      link.href = album.external_urls.spotify;
      link.style.cssText = "text-decoration:none";
      console.log(link.href);
      pTag.appendChild(hr);
      link.appendChild(pTag);
      display.appendChild(link);
    });
  }

  var url = "https://api.spotify.com/v1/search?q=metal&type=album";
  newRequest(url, requestComplete);
}

window.onload = app;