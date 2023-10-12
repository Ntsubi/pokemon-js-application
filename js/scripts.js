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
    document.write('<p>' + pokemon.name + " " + "(height: " + pokemon.height + ")" + '</p>')
})
pokemonRepository.add({ name: 'Squirtle', height: 5, type: ['water', 'grass'] })
console.log(pokemonRepository.getAll())





//Index array 0 is our starting point. Value i will keep iterating by an increment of 1 until its run through all objects inside array
// for (let i = 0; i < pokemonList.length; i++) {
//     document.write(pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")");
//Code below instructs browser to test for the condition inside parantheses and execute the code block if condition met
// if (pokemonList[i].height > 3) {
//     document.write(' - Wow! That\'s a big one!'); // document.write prints to the DOM unlike console.log which is not visible inside DOM
