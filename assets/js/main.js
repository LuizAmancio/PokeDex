


function convertPokemon(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.num}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
    
        </li>`
}
const pokemonListHTML = document.getElementById('pokemonList');
const moreButton = document.getElementById("LoadMore");
const limit = 5
let offset = 0;
const qntdLimit = 21

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset,limit).then((pokemonList = []) => {
        pokemonListHTML.innerHTML += pokemonList.map(convertPokemon).join(''); // map foi usado pra substituir o for
         /*
        const listItens = []

        for(let i = 0; i < pokemonList.length; i++){ // Para cada pokemon da lista transformar em li no html
            const pokemon = pokemonList[i];
            listItens.push(convertPokemon(pokemon)) 
        }
        */
    })    
}
     
loadPokemonItens(offset, limit)
    
    moreButton.addEventListener('click', () => {
        offset += limit
        const qtdNextPag = offset + limit
        
        if( qtdNextPag >= qntdLimit){
            const newLimit = qntdLimit - offset
            loadPokemonItens(offset, newLimit)

            moreButton.parentElement.removeChild(moreButton); 
        }else{
            loadPokemonItens(offset, limit)
        }
        
    })
    