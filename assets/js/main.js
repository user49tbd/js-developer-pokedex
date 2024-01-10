const pokemonList = document.getElementById('pokemonList')
const pokemonStatus = document.getElementById('maindiv')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let eventl = [];
let pokM = new Pokemon()

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" name="${pokemon.name}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<p class="type ${type}">${type}</p>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}
function isrtData(pokM,vl,vi){
return `
<div class='${pokM.type}'>
<h1>
pokemon
</h1>
<b class=".var">#${pokM.number}</b>
<div class="dicdisplay">
${pokM.types.map((type) => `<p class="type ${type}">${type}</p>`).join('')}

<img src="${pokM.photo}" alt="Pikachu">
</div>
<div class="statusdiv">
<table>
     <tbody>
    ${pokM.stats.map((v) =>{
        vi+=1;
        return`
    <tr>
        <td><label>${vl[vi]}</label></td>
        <td><meter value="${v}" min="0" max="100"></meter></td>
    </tr>`}).join('')}

    </tbody>
</table>
</div>
</div>`

}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        getLI(pokemonList)
    })

}

if (window.location.pathname === '/C:/Users/Maria/Desktop/GIT-Proj/Pokedex/js-developer-pokedex/index.html') {
    loadPokemonItens(offset, limit);
    loadMoreButton.addEventListener('click', () => {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit
        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)
    
            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemonItens(offset, limit)
        }
    })
}else{
    const pokemonStatus = document.getElementById('maindiv')
    pokemonStatus.innerHTML += localStorage.getItem("newHtml");
}

function getLI(pok){
    eventl = pok.getElementsByTagName("li")
    console.log(eventl.length)
    for(let i=0; i<eventl.length; i++) {
        eventl[i].addEventListener("click", function() {
            functionChange( eventl[i].getAttribute("name"))
        });
     }

} 
function functionChange(tagItem){
    pokM.name = tagItem;
    let totalpokemon=offset;
    if(offset === 0){
        totalpokemon = limit;
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach(pokemonX => {
        if(pokemonX.name == tagItem){
            pokM = pokemonX;
            let vl = ["hp","attack","defense","special-attack","special-defense","speed"];
            const newHtml = isrtData(pokM,vl,-1)
            localStorage.setItem("newHtml", newHtml);
            location.replace("deteil.html")
        }})})
}