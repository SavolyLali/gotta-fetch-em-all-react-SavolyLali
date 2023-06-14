import React, { useState, useEffect } from 'react'

const EnemyPokemon = ({ onFind, battleEnemy, enemyList }) => {

  const [pokemonData, setPokemonData] = useState(null)
  const pokeURL = enemyList[Math.floor(Math.random() * enemyList.length)].pokemon.url

  useEffect(() => {
    fetch(pokeURL)
      .then(response => response.json())
      .then(secondData => {
        const pokemonProps = {
          name: secondData.name,
          hp: secondData.stats[0].base_stat,
          maxHp: secondData.stats[0].base_stat,
          attack: secondData.stats[1].base_stat,
          defense: secondData.stats[2].base_stat,
          url_front: secondData.sprites.versions['generation-v']['black-white'].animated.front_default,
          defeat: pokeURL,
          hit: false
        };
        setPokemonData(pokemonProps)
        console.log(pokemonProps);
        onFind(pokemonProps);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    battleEnemy ? (
      <div className='enemy'>
        <h2>{battleEnemy && battleEnemy.name}</h2>
        <img className={battleEnemy.hit === 'pikachu' ? 'front pikachuHit' : battleEnemy.hit ? 'front pokemonHit' : 'front'} src={battleEnemy && battleEnemy.url_front} alt="" />
        {
          battleEnemy &&
          <div id="hpwrap">
            <div id="hpbar">
              <div id="hp" className={(battleEnemy.hp / battleEnemy.maxHp) >= 0.6 ? "veryhigh" :
                (battleEnemy.hp / battleEnemy.maxHp) >= 0.4 ? "high" :
                  (battleEnemy.hp / battleEnemy.maxHp) >= 0.2 ? "low" :
                    "verylow"} style={{ width: `${battleEnemy.hp > 0 ? battleEnemy.hp / battleEnemy.maxHp * 100 : 0}%` }}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
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
              <div id="hp" className={(pokemonData.hp / pokemonData.maxHp) >= 0.6 ? "veryhigh" :
                (pokemonData.hp / pokemonData.maxHp) >= 0.4 ? "high" :
                  (pokemonData.hp / pokemonData.maxHp) >= 0.2 ? "low" :
                    "verylow"} style={{ width: `${pokemonData.hp > 0 ? pokemonData.hp / pokemonData.maxHp * 100 : 0}%` }}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
            </div>
          </div>
        }
        <div>{pokemonData && pokemonData.name}</div>
        <img className='front' src={pokemonData && pokemonData.url_front} alt="" />
      </div>
    )
  )
}

export default EnemyPokemon
