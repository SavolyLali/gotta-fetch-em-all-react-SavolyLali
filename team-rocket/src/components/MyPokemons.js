import React, { useEffect, useState } from "react";

const MyPokemons = (props) => {
  const [isChosen, setIsChosen] = useState(null);

  const handleChoosePokemon = (pokemon) => {
    setIsChosen(pokemon);
  };

  return isChosen === null ? (
    <div className="my-pokemons">
      {props.pokemons &&
        props.pokemons.map((pokemon, index) => (
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
  ) : (
    <div className="my-pokemons">
      <div>{isChosen.name}</div>
      <img className="back" src={isChosen.url_back} />
      <button id="strikeButton">Strike!</button>
    </div>
  );
};

export default MyPokemons;
