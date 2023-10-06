let pokemonList = [
    {name: 'Squirtle', 
    height: 5, 
    type: ['water', 'grass']
    },
    {name: 'Diglet', 
    height: 2, 
    type: ['ground', 'trees']
    },
    {name: 'Pidgey', 
    height: 3, 
    type: ['flying', 'poision']
    }
]
    //Each object inside array is denoted with the placeholder value i. Using the dot operator specifies which property I want to display
    for (let i = 0; i < pokemonList.length; i++) {
        document.write(pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")");
        if (pokemonList[i].height > 3) {
            document.write(' - Wow! That\'s a big one!');
        }
        }
        
