let test = document.getElementsByClassName('pokemon-list')[0];
let data;

async function fetchData(data){
    let call = await fetch(`${data}`);
    let dataJson = await call.json();
    return dataJson;
}

function createPokemon (id, name, sprite) {
    let result;
    let start = `<div class="pokemon-list-item item-active">`;
    let end = `</div>`;
    result = `
        ${start}
        <img src="${sprite}" class="pokemon-list-image">
        <div class="pokemon-id"><h2>${createId(id)}</h2></div>
        <div class="pokemon-name"><h2>${name}</h2></div>
        <div class="pokeball-list-icon"><img src="assets/images/pokeball-list-icon.svg" alt=""></div>
    `
    result += `${end}`;
    test.innerHTML += result;
}

function postPokemon () {
    data = fetchData('https://raw.githubusercontent.com/Alen-V/pokedex/main/pokedex.json?token=AM5OIIO5KCXDAL3CF6GTG2277XAWS')
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            createPokemon(data[i].id, data[i].name, matchSprite(data[i].id));
        }
    })
}

function matchSprite (id) {
    let result = id.split('');
    switch (result.length) {
        case 2:
            result = `./assets/images/sprites/0${id}MS.PNG`;
            return result;
        case 3:
            result = `./assets/images/sprites/${id}MS.PNG`;
            return result;
    }
}

function createId (id) {
    let result = id.split('');
    switch (result.length) {
        case 2:
            result = `No. 0${id}`;
            return result;
        case 3:
            result = `No. ${id}`;
            return result;
    }
}

function insertSprite () {
    let sprite = document.getElementsByClassName('pokemon-list-image')[0]
}

postPokemon();