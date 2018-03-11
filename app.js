window.onload = function(){
  function makeCall(){
    let getPosition = function(options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
  
    getPosition().then((position) => {

      var url = "http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&fDstL=0&fDstU=100&callback=?";
      $.getJSON(url, function(response){       
      
        function compare(a,b) {
          if (a.Alt > b.Alt)
            return -1;
          if (a.Alt < b.Alt)
            return 1;
          return 0;
        }
        response.acList.sort(compare);
        
        let table = "<table><thead><tr><th>Altitude</th>";
        table += "<th>Flight code number</td>";
        table += "<th>Flight Direction</th></tr></thead>";
        for(let i = 0; i < response.acList.length; i++){
          table += "<tr><td><a href='detail.html?airmodel=" + response.acList[i].Mdl + "&from="+ response.acList[i].From + "&destination=" + response.acList[i].To + "&company=" + response.acList[i].Op +"'>"; 
          table += response.acList[i].Alt + "</a></td>";
          table += "<td><a href='detail.html?airmodel=" + response.acList[i].Mdl + "&from="+ response.acList[i].From + "&destination=" + response.acList[i].To + "&company=" + response.acList[i].Op +"'>" + response.acList[i].Call + "</a></td>";
          if(response.acList[i].Trak > 180){
            table += "<td><img src='image/airred.jpg'></td></tr>";  
          }else{
            table += "<td><img src='image/airredreverse.jpg'></td></tr>";
          }          
        }
        table += "</table>";
        $("#table").html(table);

      });
    
    }).catch((error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("In order to use this app you need to allow location access!");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    });  
  }  

  makeCall();
  setInterval(function(){
    makeCall();
  }, 60000)
  
};
