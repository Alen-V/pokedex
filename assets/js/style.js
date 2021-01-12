let test = document.getElementsByClassName('pokemon-list')[0];
let pokemonList = test.children
let pokemonImage = document.getElementsByClassName('pokemon-image')[0].children[0];
let data;

async function fetchData(data){
    let call = await fetch(`${data}`);
    let dataJson = await call.json();
    return dataJson;
}

function createPokemon (id, name, sprite) {
    let result;
    let start = `<div class="pokemon-list-item">`;
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

function changePokemonImage (data, image) {
    image.src = `${data}`
}

function removeClass(elements, classElement) {
    for (let element of elements) {
        element.classList.remove(`${classElement}`)
    }
}

function selectPokemon(data) {
    for (let i = 0; i < pokemonList.length; i++) {
        pokemonList[0].classList.add('item-active')
        if(pokemonList[i].classList.contains('item-active')) {
            changePokemonImage(data[i].img, pokemonImage)
        }
        pokemonList[i].addEventListener('click', function() {
            removeClass(pokemonList, 'item-active')
            this.classList.add('item-active');
            changePokemonImage(data[i].img, pokemonImage)
        })
    }
}

function postPokemon () {
    data = fetchData('https://raw.githubusercontent.com/Alen-V/pokedex/main/pokedex.json')
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            createPokemon(data[i].id, data[i].name, matchSprite(data[i].id));
            selectPokemon(data);
        }
    })
}

function matchSprite (id) {
    let result = id.split('');
    switch (result.length) {
        case 2:
            result = `./assets/images/0${id}MS.png`;
            return result;
        case 3:
            result = `./assets/images/${id}MS.png`;
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