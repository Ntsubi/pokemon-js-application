let pokemonRepository = (function () {

    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        })
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
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
            item.types = details.types;
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
        let modalContainer = document.querySelector('#modal-container');

        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerText = 'text';

        let closeButton = document.createElement('button');
        closeButton.classList.add('button');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        let modalTitle = document.createElement('h1');
        modalTitle.innerText = pokemon.name;

        let modalContent = document.createElement('p');
        modalContent.innerText = item.height;

        let modalImage = document.createElement('img');
        modalImage.src = item.imageUrl;

        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalContent);
        modal.appendChild(modalImage)
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    }

})()

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })

})
document.querySelector('#show-modal').addEventListener('click', () => {
    showModal(pokemon);
});



