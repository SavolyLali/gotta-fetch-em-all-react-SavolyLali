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
        <img id="pokeCardPokemon" src={pokemon.url_front} alt="" />
        <div>HP: {pokemon.hp}</div>
        <div>ATK: {pokemon.attack}</div>
        <div>DEF: {pokemon.defense}</div>
        <button onClick={() => handleChoosePokemon(pokemon)}>Choose</button>
        </div>
      ))}
    </div>
  ) : <div>
    <div>{isChosen.name}</div>
        <img src={isChosen.url_back} alt=""/>
        {
        isChosen &&
        <div id="hpwrap">
          <div id="hpbar">
            <div id="hp" className={(isChosen.hp/isChosen.maxHp) >= 0.6 ? "veryhigh" :
            (isChosen.hp/isChosen.maxHp) >= 0.4 ? "high" :
            (isChosen.hp/isChosen.maxHp) >= 0.2 ? "low" :
            "verylow"} style={{width: `${isChosen.hp > 0 ? isChosen.hp/isChosen.maxHp*100 : 0}%`}}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
          </div>
        </div>
      }
  </div>;
};

export default MyPokemons;
