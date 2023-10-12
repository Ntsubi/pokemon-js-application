let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Squirtle',
            height: 5,
            type: ['water', 'grass']
        },
        {
            name: 'Diglet',
            height: 2,
            type: ['ground', 'trees']
        },
        {
            name: 'Pidgey',
            height: 3,
            type: ['flying', 'poision']
        }
    ]

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    return {
        getAll: getAll,
        add: add
    }

})()

console.log(pokemonRepository.getAll())
pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = 'pokemon.name';
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

})
pokemonRepository.add({ name: 'Squirtle', height: 5, type: ['water', 'grass'] })
console.log(pokemonRepository.getAll())





