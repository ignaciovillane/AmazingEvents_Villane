const divElementos = document.getElementById('home_cards')

let tarjetas = ''

for (e of data.events) {
    tarjetas += `<div class="d-flex flex-wrap gap-3 justify-content-center p-3 bg-secondary rounded-3">
                <div class="card" style="width: 18rem;">
                 <img src="${e.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <p class="card-text">${e.description}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h6>Price $ ${e.price}<h6>
                <a href="./details.html" class="btn btn-primary">See more...</a>
                </div>
                </div>
                </div>`
}

console.log(tarjetas);

divElementos.innerHTML = tarjetas