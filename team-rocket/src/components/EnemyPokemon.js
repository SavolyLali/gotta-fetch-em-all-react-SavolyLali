import React, { useState, useEffect } from 'react'


const EnemyPokemon = ({onFind, battleEnemy}) => {

  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => {
        const secondUrl = data.results[Math.floor(Math.random() * 20)].url;
        console.log(secondUrl)

        return fetch(secondUrl)
          .then(response => response.json())
          .then(secondData => {
            const pokemonProps = {
              name: secondData.name,
              hp: secondData.stats[0].base_stat,
              maxHp: secondData.stats[0].base_stat,
              attack: secondData.stats[1].base_stat,
              defense: secondData.stats[2].base_stat,
              url_front: secondData.sprites.versions['generation-v']['black-white'].animated.front_default
            };
            setPokemonData(pokemonProps)
            console.log(pokemonProps);
            onFind(pokemonProps);
          })
      })
  }, []);
  return (

battleEnemy ? (
  <div className='enemy'>
      <div>{battleEnemy && battleEnemy.name}</div>
      <img className='front' src={battleEnemy && battleEnemy.url_front} alt="" />
      {
        battleEnemy &&
        <div id="hpwrap">
          <div id="hpbar">
            <div id="hp" className={(battleEnemy.hp/battleEnemy.maxHp) >= 0.6 ? "veryhigh" :
            (battleEnemy.hp/battleEnemy.maxHp) >= 0.4 ? "high" :
            (battleEnemy.hp/battleEnemy.maxHp) >= 0.2 ? "low" :
            "verylow"} style={{width: `${battleEnemy.hp > 0 ? battleEnemy.hp/battleEnemy.maxHp*100 : 0}%`}}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
          </div>
        </div>
      }
    </div>
):(

    <div className='enemy'>
      {
        pokemonData &&
        <div id="hpwrap">
          <div id="hpbar">
            <div id="hp" className={(pokemonData.hp/pokemonData.maxHp) >= 0.6 ? "veryhigh" :
            (pokemonData.hp/pokemonData.maxHp) >= 0.4 ? "high" :
            (pokemonData.hp/pokemonData.maxHp) >= 0.2 ? "low" :
            "verylow"} style={{width: `${pokemonData.hp > 0 ? pokemonData.hp/pokemonData.maxHp*100 : 0}%`}}>&nbsp;&nbsp;HP&nbsp;&nbsp;</div>
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
