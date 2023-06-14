import React, { useEffect, useState } from "react";

const MyPokemons = ({pokemons, onBattleClick, onFightClick, battlePokemon}) => {
  const [isChosen, setIsChosen] = useState(null);

  const handleChoosePokemon = (pokemon) => {
    setIsChosen(pokemon);
    onBattleClick(pokemon);
  };

  return isChosen === null ? (
    <div className="my-pokemons">
      {pokemons &&
        pokemons.map((pokemon, index) => (
          <div id="pokeCard" key={index}>
            <div>{pokemon.name}</div>
            <img id="pokeCardPokemon" src={pokemon.url_front} alt=""/>
            <div>HP: {pokemon.hp}</div>
            <div>ATK: {pokemon.attack}</div>
            <div>DEF: {pokemon.defense}</div>
            <button onClick={() => handleChoosePokemon(pokemon)}>Choose</button>
          </div>
        ))}
    </div>
  ) : (
    <div className="my-pokemons">
      <div>{battlePokemon.name}</div>
      <img className="back" src={battlePokemon.url_back} alt=""/>
      <div id="hpwrap">
          <div id="hpbar">
            <div id="hp" className={(battlePokemon.hp/battlePokemon.maxHp) >= 0.6 ? "veryhigh" :
            (battlePokemon.hp/battlePokemon.maxHp) >= 0.4 ? "high" :
            (battlePokemon.hp/battlePokemon.maxHp) >= 0.2 ? "low" :
            "verylow"} style={{width: `${battlePokemon.hp > 0 ? battlePokemon.hp/battlePokemon.maxHp*100 : 0}%`}}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
          </div>
        </div>
      <button id="strikeButton" onClick={onFightClick}>Strike!</button>
    </div>
  );
};

export default MyPokemons;
