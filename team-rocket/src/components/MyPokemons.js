import React from "react";
import chooseSoundEffect from '../sounds/ichooseyou.mp3';

const MyPokemons = ({ pokemons, onBattleClick, onFightClick, battlePokemon, enemyTurn }) => {

  const playSoundEffect = () => {
    const audio = new Audio(chooseSoundEffect);
    audio.play();
  };

  const handleChoosePokemon = (pokemon) => {
    onBattleClick(pokemon);
    playSoundEffect()
  };

  return battlePokemon === null ? (
    <div className="my-pokemons">
      {pokemons &&
        pokemons.map((pokemon, index) => (
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
  ) : (
    <div className="my-pokemons">
      <h2>{battlePokemon && battlePokemon.name}</h2>
      <img className={battlePokemon.hit ? 'back pokemonHit' : 'back'} src={battlePokemon.url_back} alt="" />
      <div id="hpwrap">
        <div id="hpbar">
          <div id="hp" className={(battlePokemon.hp / battlePokemon.maxHp) >= 0.6 ? "veryhigh" :
            (battlePokemon.hp / battlePokemon.maxHp) >= 0.4 ? "high" :
              (battlePokemon.hp / battlePokemon.maxHp) >= 0.2 ? "low" :
                "verylow"} style={{ width: `${battlePokemon.hp > 0 ? battlePokemon.hp / battlePokemon.maxHp * 100 : 0}%` }}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
        </div>
      </div>
      {enemyTurn ?
          <button id="strikeButton" onClick={onFightClick} disabled>Strike!</button>
          :
          <button id="strikeButton" onClick={onFightClick}>Strike!</button>
      }
    </div>
  );
};

export default MyPokemons;
