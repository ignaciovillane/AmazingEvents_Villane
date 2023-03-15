const containerCards = document.getElementById("containerCards") //Selecciono un elemento HTML del DOM utilizando document.getElementById() y lo almaceno en una variable llamada containerCards
const querySearch = document.location.search //obtengo la cadena de consulta de la URL actual de la página y la almaceno en una variable llamada querySearch. La cadena de consulta es todo lo que aparece después del signo "?" en la URL.
const id = new URLSearchParams(querySearch).get("id") //Obtengo el valor del parámetro "id" de la URL utilizando URLSearchParams() y lo almaceno en una variable llamada id

const contenedor = document.getElementById('contenedor')
const contenedorCheck = document.getElementById('checkContainer')
const input = document.querySelector('input')

function getEvents(array) {
    const eventNew = array.map(e => {
        let aux = {}
        aux.image = e.image
        aux.name = e.name
        aux.date = e.date
        aux.description = e.description
        aux.category = e.category
        aux.place = e.place
        aux.capacity = e.capacity
        aux.assistance = e.assistance
        aux.price = e.price
        aux._id = e._id
        return aux
    })
    return eventNew
}

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
        <p class="card-text">Assistance: ${array.assistance}</p>
        <p class="card-text">Price: ${array.price}</p>
        </div>
      </div>
    </div>
</div>

   `
}

let arr = getEvents(data.events)
console.log(arr)
let arr2 = findId(arr, id)
console.log(arr2)
showCard(arr2)