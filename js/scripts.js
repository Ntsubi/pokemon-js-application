let pokemonRepository = (function () {
    //These variables are positioned here at the very top of the code so that they can be accessible to functions declared below
    const pokemonList = []
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    const modalContainer = document.querySelector('#modal-container');

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
        // This clears the div first, avoiding creating multiple divs in DOM
        modalContainer.replaceChildren();

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButton = document.createElement('button');
        closeButton.classList.add('button');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        let modalTitle = document.createElement('h1');
        modalTitle.innerText = pokemon.name;

        let modalContent = document.createElement('p');
        modalContent.innerText = "Height: " + pokemon.height;

        let modalImage = document.createElement('img');
        modalImage.src = pokemon.imageUrl;

        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalContent);
        modal.appendChild(modalImage)
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }
    //Declaring the hide modal function, and the event listeners added to execute this function
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if(e.target === modalContainer) {
            hideModal();
        }
    })
    
    window.addEventListener('keydown', (e)=> {
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    })

    //When called, the function pokemonRepository will return the object inside the curly braces
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal
    }

})()

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});



