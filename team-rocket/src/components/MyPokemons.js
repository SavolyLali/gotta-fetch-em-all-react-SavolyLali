import React, { useEffect, useState } from "react";

const MyPokemons = ({pokemons, onBattleClick}) => {
  const [isChosen, setIsChosen] = useState(null);

  
  const handleChoosePokemon = (pokemon) => {
    setIsChosen(pokemon);
    onBattleClick(pokemon);
  };

  return isChosen === null ? (
    <div>
      {pokemons && pokemons.map((pokemon, index) => (
        <div id="pokeCard" key={index}>
        <div>{pokemon.name}</div>
        <img id="pokeCardPokemon" src={pokemon.url_front} />
        <div>HP: {pokemon.hp}</div>
        <div>ATK: {pokemon.attack}</div>
        <div>DEF: {pokemon.defense}</div>
        <button onClick={() => handleChoosePokemon(pokemon)}>Choose</button>
        </div>
      ))}
    </div>
  ) : <div>
    <div>{isChosen.name}</div>
        <img src={isChosen.url_back}/>
  </div>;
};

export default MyPokemons;
