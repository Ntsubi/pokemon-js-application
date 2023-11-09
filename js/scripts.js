let pokemonRepository = (function () {
    //These variables are positioned here at the very top of the code so that they can be accessible to functions declared below
    const pokemonList = []
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    //DOM manipulation
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        //Adding Bootstrap utility class for li elements below
        listItem.classList.add('col');
        button.classList.add('list-group-item');
        button.classList.add('btn', 'btn-primary', 'button-class');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json(); //This returns a promise
        }).then(function (json) { //Code block between curly braces returns the actual JSON response
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Pokemon properties added using the code below
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            for (let i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }

        }).catch(function (e) {
            console.log(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        //Calling the empty function clears exisiting content of the modal
        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h2>' + pokemon.name + '</h2>');
        let imageElement = $('<img class = "modal-img" style =width:40%>');
        imageElement.attr("src", pokemon.imageUrl);
        let heightElement = $('<p>' + "Height: " + pokemon.height + '</p>');
        let weightElement = $('<p>' + "Weight: " + pokemon.weight + '</p>');
        let typesElement = $('<p>' + "Types: " + pokemon.types + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }

    //When called, the function pokemonRepository will return the object inside the curly braces
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    }

})();

const searchInput = document.getElementById("searchinput");

searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value;
    const pokemons = document.querySelectorAll('.list-group-item');
    pokemons.forEach(poke => {
        if (poke.innerText.toLowerCase().includes(keyword.toLowerCase())) {
            poke.parentNode.style.display = 'block';
        } else {
            poke.parentNode.style.display = 'none';
        }
    })
})

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        console.log(pokemon);
        pokemonRepository.addListItem(pokemon);
    })
});



