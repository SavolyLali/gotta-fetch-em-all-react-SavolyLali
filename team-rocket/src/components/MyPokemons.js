import React, { useState } from 'react'

const MyPokemons = () => {
  const [isChosen, setIsChosen] = useState(null)
  const [usersPokemon, setUsersPokemon] = useState([
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charmander",
    "https://pokeapi.co/api/v2/pokemon/squirtle",
    "https://pokeapi.co/api/v2/pokemon/pikachu"
])

  return (
    isChosen === null ?
    <div>MyPokemons</div> : null
    
  
  )
}

export default MyPokemons
