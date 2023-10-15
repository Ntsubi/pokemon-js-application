let pokemonRepository = (function () {

    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function () {
            alert(`You have selected ${pokemon.name}!`);
        })
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }

})()

console.log(pokemonRepository.getAll())
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

})
pokemonRepository.add({ name: 'Squirtle', height: 5, type: ['water', 'grass'] })
console.log(pokemonRepository.getAll())





