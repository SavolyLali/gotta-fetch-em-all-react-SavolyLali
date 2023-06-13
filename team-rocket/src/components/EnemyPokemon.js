import React, { useState, useEffect } from 'react'


const EnemyPokemon = () => {

  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon') 
    .then(response => response.json())
    .then(data => {
      const secondUrl = data.results[Math.floor(Math.random() * 20)].url; 
      
      fetch(secondUrl)
        .then(response => response.json())
        .then(secondData => {
          const pokemonProps = {
            name : secondData.name,
            hp : secondData.stats[0].base_stat,
            attack : secondData.stats[1].base_stat,
            defense : secondData.stats[2].base_stat
          };
          setPokemonData(pokemonProps)
          console.log(pokemonProps);
        })
    })
  }, []);
console.log('dikszoszi')
  return (
    <div>{pokemonData && pokemonData.name}</div>
  )
}

export default EnemyPokemon