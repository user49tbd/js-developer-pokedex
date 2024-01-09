const poktransition = {
    valpok: new Pokemon()
}

poktransition.functionChange = function(tagItem){
    //console.log("findlinx-----1"+tagItem)
    let pokM = new Pokemon()
    pokM.name = tagItem;
    let totalpokemon=offset;
    if(offset === 0){
        totalpokemon = limit;
    }
    //console.log("findlinx-----2")

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemons.forEach(pokemonX => {
        if(pokemonX.name == tagItem){
            //console.log("findlinx-----"+pokemonX.name)
            return pokM = pokemonX;
            //console.log(pokM.name+" - "+pokM.number+" - "+pokM.type+" - "+pokM.stats)
        }})})
    //console.log(tagItem);
    //tagItem.
    //location.replace("deteil.html")
}