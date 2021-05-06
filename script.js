
const paragraph = document.querySelectorAll("p");
const ipAddress = document.querySelector(".ip")
const button = document.querySelector(".botao")
const header = document.querySelector("header")
const paragraphError = document.createElement("p")


button.addEventListener("click", (event)=>{
event.preventDefault();
reset();
request ();

})


function request (){
const ipValue = ipAddress.value;
axios.get(`https://geo.ipify.org/api/v1?apiKey=at_m2vl4OIpADYQUjGIvBHzDUhII4O5L&ipAddress=${ipValue}`)
.then((function(response){

if(ipValue!==""){


  initializingMap();

  var map = L.map('map').setView([`${response.data.location.lat}`, `${response.data.location.lng
  }` ], 15);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  L.marker([`${response.data.location.lat}`, `${response.data.location.lng
  }`]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();



console.log(response.data)
const ip = document.createTextNode(response.data.ip);
const isp = document.createTextNode(response.data.isp);
const timezone = document.createTextNode(`UTC ${response.data.location.timezone}`);
const location = document.createTextNode(`${response.data.location.city}, ${response.data.location.region}, ${response.data.location.postalCode}`);


const listResponse = [ip, location, timezone, isp]

for (i =0; i<listResponse.length; i++){

paragraph[i].appendChild(listResponse[i])
  }
}

}))
.catch((erro)=>{
 
  paragraphError.setAttribute("class", "error")
  paragraphError.innerText= "Digite um IP existente"
  header.appendChild(paragraphError)
  
})
}

function reset(){
paragraph[0].innerHTML = "";
 paragraph[1].innerHTML = "";
 paragraph[2].innerHTML = "";
 paragraph[3].innerHTML = "";
 paragraphError.innerText= ""

 


}

function initializingMap() 
{
var container = L.DomUtil.get('map'); 
if(container != null){ 
  container._leaflet_id = null;
 }

}