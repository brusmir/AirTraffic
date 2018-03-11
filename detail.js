window.onload = function(){
  let search = window.location.href;                      
  let vars = {};
  search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    key = decodeURIComponent(key);
    value = decodeURIComponent(value);
    vars[key] = value;
  });
  
  let table = "<table><thead><tr><th>Airplane Manufacturer and Model</th>";
  table += "<th>Destination</th>";
  table += "<th>Flight Origin Airport</th>"
  table += "<th>Logo of the Airline Company</th></tr></thead>";
  table += "<tbody><tr><td>" + vars.airmodel + "</td>";
  table += "<td>" + vars.from + "</td>";
  table += "<td>" + vars.destination + "</td>";
  table += "<td><img src='https://logo.clearbit.com/segment.com'></td>";
  table += "</tr></tbody>"
  table += "</table>";          
  
  let div = document.getElementById('table').innerHTML = table;
  let img = document.getElementsByTagName('img')[0];
  img.src = "https://logo.clearbit.com/" + vars.company.toLowerCase().replace(/ /g,'') + ".com";
  
}
 
