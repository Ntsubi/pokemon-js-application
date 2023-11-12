function showModal(pokemon) {

    const modalBody = $('.modal-body');
    const modalTitle = $('.modal-title');

    //Calling the empty function clears exisiting content of the modal
    modalTitle.empty();
    modalBody.empty();

    const nameElement = $('<h2>' + pokemon.name + '</h2>');
    const imageElement = $('<img class = "modal-img" style =width:40%>');
    imageElement.attr("src", pokemon.imageUrl);
    const heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    const weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    const typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
}