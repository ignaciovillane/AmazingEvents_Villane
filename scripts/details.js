const containerCards = document.getElementById("containerCards") //Selecciono un elemento HTML del DOM utilizando document.getElementById() y lo almaceno en una variable llamada containerCards
const querySearch = document.location.search //obtengo la cadena de consulta de la URL actual de la página y la almaceno en una variable llamada querySearch. La cadena de consulta es todo lo que aparece después del signo "?" en la URL.
const id = new URLSearchParams(querySearch).get("id") //Obtengo el valor del parámetro "id" de la URL utilizando URLSearchParams() y lo almaceno en una variable llamada id

const contenedor = document.getElementById('contenedor')
const contenedorCheck = document.getElementById('checkContainer')
const input = document.querySelector('input')

let dataApi;

async function fetchInfo() {
    let data = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(resp => resp.json())
        .then(allData => {
            dataApi = allData;
            return dataApi;
        });
    return data;
};

dataReturned();

async function dataReturned() {
    let dataApi = await fetchInfo();
    showCard(findId(dataApi.events,id))
};




function findId(array, ident) {
    let arrayID = array.find(eventDetail => eventDetail._id == ident)
    return arrayID
    
}

function showCard(array) {
    containerCards.innerHTML = `

    <div class="card mb-3" style="max-width: 100%;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img class="img-fluid" src="${array.image}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <h4 class="card-title">Title: ${array.name}</h4>
        <p class="card-text">Date: ${array.date}</p>
        <p class="card-text">Description: ${array.description}</p>
        <p class="card-text">Category: ${array.category}</p>
        <p class="card-text">Place: ${array.place}</p>
        <p class="card-text">Capacity: ${array.capacity}</p>
        <p class="card-text">${array.assistance !== undefined ? "Assistance: " : "Assistance Estimate: "}${array.assistance !== undefined ? array.assistance : array.estimate}</p>
        <p class="card-text">Price: ${array.price}</p>
        </div>
      </div>
    </div>
</div>

   `
}
