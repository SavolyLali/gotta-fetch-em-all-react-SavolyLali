import React, { useEffect, useState } from "react";

const MyPokemons = () => {
  const [isChosen, setIsChosen] = useState(null);
  const [usersPokemon, setUsersPokemon] = useState([
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charmander",
    "https://pokeapi.co/api/v2/pokemon/squirtle",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
  ]);
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    setPokeData([...pokeData, 
      usersPokemon.map((pokemon, index) => {
        let pokemonProps
        fetch(pokemon)
          .then((response) => response.json())
          .then((secondData) => {
             pokemonProps = {
              name: secondData.name,
              hp: secondData.stats[0].base_stat,
              attack: secondData.stats[1].base_stat,
              defense: secondData.stats[2].base_stat,
              url_front:
                secondData.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default,
              url_back:
                secondData.sprites.versions["generation-v"]["black-white"]
                  .animated.back_default,
            };

            console.log("render");
            console.log('asd', pokemonProps)
            return pokemonProps;
          });

      })
    ]);
    
  }, []);

  return isChosen === null ? (
    <div>
      {pokeData.map((pokemon, index) => (
        <div key={index}>
          <img src={pokemon && pokemon.url_back} />
        </div>
      ))}
    </div>
  ) : null;
};

export default MyPokemons;
