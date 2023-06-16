import React, { useState, useEffect } from 'react';

const EnemyPokemon = ({ onFind, battleEnemy, enemyList }) => {

  const HIGH = 0.6;
  const MEDIUM = 0.4;
  const LOW = 0.2;
  const HUNDRED_PERCENT = 100;

  const [pokemonData, setPokemonData] = useState(null);
  const pokeURL = enemyList[Math.floor(Math.random() * enemyList.length)].pokemon.url;

  useEffect(() => {
    fetch(pokeURL)
      .then((response) => response.json())
      .then((secondData) => {
        const HEALTH = 0;
        const ATTACK = 1;
        const DEFENSE = 2;
        const pokemonProps = {
          name: secondData.name,
          hp: secondData.stats[HEALTH].base_stat,
          maxHp: secondData.stats[HEALTH].base_stat,
          attack: secondData.stats[ATTACK].base_stat,
          defense: secondData.stats[DEFENSE].base_stat,
          urlFront:
            secondData.sprites.versions['generation-v']['black-white'].animated.front_default,
          defeat: pokeURL,
          hit: false,
        };
        setPokemonData(pokemonProps);
        console.log(pokemonProps);
        onFind(pokemonProps);
      });
  }, []);
  return (

    battleEnemy ? (
      <div className='enemy'>
        <h2>{battleEnemy && battleEnemy.name}</h2>
        <img className={battleEnemy.hit === 'pikachu' ?
          'front pikachuHit' : battleEnemy.hit ?
            'front pokemonHit' : 'front'} src={battleEnemy && battleEnemy.urlFront} alt="" />
        {
          battleEnemy &&
          <div id="hpwrap">
            <div id="hpbar">
              <div id="hp" className={(battleEnemy.hp / battleEnemy.maxHp) >= HIGH ? 'veryhigh' :
                (battleEnemy.hp / battleEnemy.maxHp) >= MEDIUM ? 'high' :
                  (battleEnemy.hp / battleEnemy.maxHp) >= LOW ? 'low' :
                    'verylow'} style={{ width: `${battleEnemy.hp > 0 ? battleEnemy.hp / battleEnemy.maxHp
                      * HUNDRED_PERCENT : 0}%` }}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
            </div>
          </div>
        }
      </div>
    ) : (

      <div className='enemy'>
        {
          pokemonData &&
          <div id="hpwrap">
            <div id="hpbar">
              <div id="hp" className={(pokemonData.hp / pokemonData.maxHp) >= HIGH ? 'veryhigh' :
                (pokemonData.hp / pokemonData.maxHp) >= MEDIUM ? 'high' :
                  (pokemonData.hp / pokemonData.maxHp) >= LOW ? 'low' :
                    'verylow'} style={{ width: `${pokemonData.hp > 0 ? pokemonData.hp / pokemonData.maxHp
                      * HUNDRED_PERCENT : 0}%` }}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
            </div>
          </div>
        }
        <div>{pokemonData && pokemonData.name}</div>
        <img className='front' src={pokemonData && pokemonData.urlFront} alt="" />
      </div>
    )
  );
};

export default EnemyPokemon;
