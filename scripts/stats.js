const bodyTable1=document.getElementById('bodyTable1')
const $bodyTable1= document.querySelector("#bodyTable1");
const $bodyTable2= document.querySelector("#bodyTable2");
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
  
};
