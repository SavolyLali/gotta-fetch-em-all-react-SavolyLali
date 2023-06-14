import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';
import FightLocation from './components/FightLocation';
import EnemyPokemon  from './components/EnemyPokemon';
import MyPokemons  from './components/MyPokemons';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/location?offset=0&limit=20');
  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [battlePokemon, setBattlePokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  const handleCountryClick = (location) => {
    setSelectedLocation(location);
    setIsClicked(true);
    setUrl(location.url)
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
    setIsClicked(false);
    setUrl('https://pokeapi.co/api/v2/location?offset=0&limit=20');
  };

  const handleFindPokemon = (pokemon) => {
    setEnemyPokemon(pokemon);
  }

  const calculateHP(attacker, defender) {
    const MIN = 217;
    const MAX = 255;
    const BASE_DAMAGE = (2 / 5 + 2) * 60 / 50;
    const MIN_DAMAGE = 2;
    const DAMAGE_NORMALIZOR = 255;
    const random = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    return defender.hp - ((BASE_DAMAGE*attacker.attack/defender.defense)+MIN_DAMAGE)*random/DAMAGE_NORMALIZOR
  }

  const battleTurn = (isPlayerTurn) => {
    if (isPlayerTurn) {
      
    } else {}
  }

  const startBattle = () => {
    let isPlayerTurn = true;
    while(battlePokemon.hp > 0 && enemyPokemon.hp > 0) {
      battleTurn(isPlayerTurn);
      isPlayerTurn = !isPlayerTurn;
    }
  }

  const handleBattleClick = (pokemon) => {
    setBattlePokemon(pokemon);
    startBattle();
  }

  

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, [url]);

  const [usersPokemon, setUsersPokemon] = useState([
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charmander",
    "https://pokeapi.co/api/v2/pokemon/squirtle",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
  ]);
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    usersPokemon.forEach((url, index) => {
 fetch(url)
        .then(response => response.json())
        .then(secondData => {
          const pokemonProps = {
            name : secondData.name,
            hp : secondData.stats[0].base_stat,
            attack : secondData.stats[1].base_stat,
            defense : secondData.stats[2].base_stat,
            url_front : secondData.sprites.versions['generation-v']['black-white'].animated.front_default,
            url_back : secondData.sprites.versions['generation-v']['black-white'].animated.back_default
          };
          setPokeData(prevData => [...prevData, pokemonProps]);
    })
  })
  }, []);



  return (
    <div className="App">
      {!selectedLocation && (
        data && <Locations locations={data.results} onClick={handleCountryClick} />
      )}
  
      {selectedLocation && isClicked && (
        <div>
          <FightLocation location={selectedLocation} onClick={handleBackClick} />
          <EnemyPokemon onFind={handleFindPokemon}/>
          <MyPokemons pokemons={pokeData} onClick={handleBattleClick}/>
        </div>
      )}
    </div>
  );
}

export default App;
