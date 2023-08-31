/* Interação com Promise
fetch(url)
    .then(function(response){
        console.log(response);
        response.Json() -> Converte para Json
    })
    .catch(function (error){ Tratar erro
        console.log(error);
    })
    .finally(function(){ Depois de finalizar a requisição
        console.log("Requisição concluída");
    })
*/

const pokeApi = {}

function convertPokeDetalhe(pokeDetalhe){ // selecionando apenas o necessário dos Detalhes
    const pokemon = new Pokemon()
    pokemon.num = pokeDetalhe.id
    pokemon.name = pokeDetalhe.name

    const types = pokeDetalhe.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = pokeDetalhe.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetalhes = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json()).then(convertPokeDetalhe)
}

pokeApi.getPokemons = function(offset = 0,limit = 10){
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json()) //Converter para Json
    .then((jsonBody) => jsonBody.results) // Manipular Json de resposta *results é o conteúdo que queremos
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetalhes)) // pegando url com detalhes do pokemon e convertendo para Json
    .then((detalheRequest) => Promise.all(detalheRequest)) // Esperando todas requisições terminarem
    .then((pokemonsDetalhes) => pokemonsDetalhes)
}