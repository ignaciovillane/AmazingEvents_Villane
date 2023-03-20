const contenedor = document.getElementById('contenedor')
const contenedorCheck = document.getElementById('checkContainer')
const input = document.querySelector('input')

input.addEventListener('input', superFilter)

contenedorCheck.addEventListener('change', superFilter)

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

    showCard(showDetail(dataApi.events));
    showCheck(dataApi.events);
};



function superFilter() {
    let firstFilter = filterText(showDetail(dataApi.events), input.value)
    let secondFilter = filterCategory(firstFilter)
    showCard(secondFilter)
}


function showCheck(array) {
    let arrayCategory = array.map(e => e.category)

    let setCategory = new Set(arrayCategory)

    let arrayChecks = Array.from(setCategory)

    let checkboxes = ''
    arrayChecks.forEach(element => {
        checkboxes += `<div class="form-check ">
                <input class="form-check-input" type="checkbox"  id="${element}" value="${element}">
                <label class="form-check-label" for="${element}">${element}</label>
              </div>`

        contenedorCheck.innerHTML = checkboxes
    })
}

function showCard(array) {
    if (array.length == 0) {
        contenedor.innerHTML = `<h2 class="display-1 fw-bolder">The event does not exist</h2>`
        return
    }
    let tarjetas = ''
    for (e of array) {
        if (Date.parse(`${e.date}`) < Date.parse(dataApi.currentDate)) {
            tarjetas +=
                `
                        <div class="card" style="width: 18rem;">
                        <img src="${e.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${e.name}</h5>
                            <p class="card-text">${e.description}</p>
                        </div>
                       <div class="d-flex justify-content-between">
                       <h6>Price $ ${e.price}<h6>
                       <a href="./details.html?id=${e.id}" class="btn btn-primary">See more...</a>
                       </div>
                       </div>
                       `
        }
        console.log(tarjetas);
        contenedor.innerHTML = tarjetas
    }
}

function filterText(array, text) {
    let arrayFiltred = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFiltred
}

function filterCategory(array) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayChecks = Array.from(checkboxes)
    let arrayChecksChecked = arrayChecks.filter(check => check.checked)
    console.log(arrayChecksChecked);
    let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
    console.log(arrayChecksCheckedValues);
    let arrayFiltred = array.filter(element => arrayChecksCheckedValues.includes(element.category))
    console.log(arrayFiltred);
    if (arrayChecksChecked.length > 0) {
        return arrayFiltred
    }
    return array
}
//showCard(showDetail(data.events))
//showCheck(data.events)

showCard(showDetail(dataApi.events))
showCheck(dataApi.events)
function showDetail(array) {
    const eventDetail = array.map(e => {
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
        aux.id = e._id
        return aux
    })
    return eventDetail

}