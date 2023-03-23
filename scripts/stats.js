const bodyTable1 = document.getElementById('bodyTable1')
const bodyTable2 = document.getElementById('bodyTable2')
const bodyTable3 = document.getElementById('bodyTable3')
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
    console.log(dataApi.events)
    porcentAssintance(dataApi.events)
    console.log(porcentAssintance(dataApi.events))
    let eventosPasados = filterPastEvents(dataApi.events, dataApi.currentDate)
    let eventosFuturos = filterFutureEvents(dataApi.events, dataApi.currentDate)
    console.log(eventosFuturos)


    let futureCat = Array.from(new Set(eventosFuturos.map(data => data.category)))
    let pastCat = Array.from(new Set(eventosPasados.map(dat => dat.category)))

    let tabla1 = {
        'mayorCapacidad': eventosPasados.sort(function(a, b) { return b.capacity - a.capacity })[0],
        'mayorPorcentaje': eventosPasados.sort(function(a, b) { return b.porcentaje - a.porcentaje })[0],
        'menorPorcentaje': eventosPasados.sort(function(a, b) { return a.porcentaje - b.porcentaje })[0]
    }


    let tdTable1 = `  <tr>
    <td>${tabla1.mayorPorcentaje.name} (${tabla1.mayorPorcentaje.porcentaje}%)</td>
    <td>${tabla1.menorPorcentaje.name} (${tabla1.menorPorcentaje.porcentaje}%)</td>
    <td>${tabla1.mayorCapacidad.name} (${tabla1.mayorCapacidad.capacity})</td>
    </tr>`


    bodyTable1.innerHTML = tdTable1;

    let tableFuture = tableCategories(futureCat, eventosFuturos)
    console.log(tableCategories(futureCat, eventosFuturos))
    showTable(tableFuture, bodyTable2, futureCat)
    console.log(showTable(tableFuture, bodyTable2, futureCat))
    let tablePast = tableCategories(pastCat, eventosPasados)
    showTable(tablePast, bodyTable3, pastCat)



};

function porcentAssintance(events) {
    events.forEach(event => {
        if (isNaN(event.assistance)) {
            event["porcentaje"] = parseFloat(((event.estimate / event.capacity) * 100).toFixed(2))
        } else {
            event["porcentaje"] = parseFloat(((event.assistance / event.capacity) * 100).toFixed(2))

        }
    });

}

function filterPastEvents(events, actualDate) {
    let pastEvents = events.filter((event) => event.date < actualDate)
    return pastEvents
}

function filterFutureEvents(events, actualDate) {
    let futureEvents = events.filter((event) => event.date > actualDate)
    return futureEvents
}



function tableCategories(arrayCategories, events) {
    let table = []
    for (let i = 0; i < arrayCategories.length; i++) {
        table.push([])
        for (const event of events) {
            if (arrayCategories[i] == event.category) {
                table[i].push(event)
            }
        }
    }
    return table
}

function showTable(array, tabla, arrayCategorias) {
    let tableHTML = ``

    for (let i = 0; i < array.length; i++) {
        let revenue = 0
        let porcentTable = 0
        let categoria


        for (const evento of array[i]) {
            categoria = evento.category
            revenue += evento.price * (isNaN(evento.assistance) ? evento.estimate : evento.assistance)
            porcentTable += evento.porcentaje
        }
        categoria = arrayCategorias[i]
        porcentajeTablaPromedio = porcentTable / (array[i].length)
        tableHTML += `
            <tr>
             <td>${categoria}</td>
             <td>$${revenue}</td>
             <td>${parseFloat(porcentajeTablaPromedio.toFixed(2))}%</td>
            <tr>  `
        tabla.innerHTML = tableHTML
    }
}