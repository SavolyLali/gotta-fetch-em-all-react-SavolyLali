import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';
import FightLocation from './components/FightLocation';
import EnemyPokemon from './components/EnemyPokemon';
import MyPokemons from './components/MyPokemons';

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
    document.body.classList.remove('locationBackground');
    document.body.classList.add('fightBackground');
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
    setIsClicked(false);
    setUrl('https://pokeapi.co/api/v2/location?offset=0&limit=20');
    document.body.classList.remove('fightBackground');
    document.body.classList.add('locationBackground');
  };

  const handleFindPokemon = (pokemon) => {
    setEnemyPokemon(pokemon);
  }

  const calculateHP = (attacker, defender) => {
    const MIN = 217;
    const MAX = 255;
    const BASE_DAMAGE = (2 / 5 + 2) * 60 / 50;
    const MIN_DAMAGE = 2;
    const DAMAGE_NORMALIZOR = 255;
    const random = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    return (defender.hp - ((BASE_DAMAGE * attacker.attack / defender.defense) + MIN_DAMAGE) * random / DAMAGE_NORMALIZOR)
  }

  const winning = () => {
    if (enemyPokemon.hp <= 0 || battlePokemon.hp <= 0) {
      if (enemyPokemon.hp <= 0) {
        console.log('you won');
      } else if (battlePokemon.hp <= 0) {
        console.log('you lost')
      }
      battlePokemon.hp = battlePokemon.maxHp;
      setBattlePokemon(null)
      setEnemyPokemon(null)
      handleBackClick();
      return false;
    }
    return true;
  }

  const handleFightClick = () => {
    console.log('fight', battlePokemon.hp, enemyPokemon.hp)
    if (battlePokemon && enemyPokemon) {
      enemyPokemon.hp = calculateHP(battlePokemon, enemyPokemon)
      setEnemyPokemon({ ...enemyPokemon })
      const win = winning()
      if (win) {
        setTimeout(() => {
          battlePokemon.hp = calculateHP(enemyPokemon, battlePokemon)
          setBattlePokemon({ ...battlePokemon })
        }, 500);
        winning()
      }
    }
  }

  const pikachuSuper = (pokemon) => {
    if (pokemon.name === 'pikachu') {
      pokemon.hp = pokemon.hp * 10;
      pokemon.attack = pokemon.attack * 10;
      pokemon.defense = pokemon.defense * 10;
    }
    return pokemon
  }

  const handleBattleClick = (pokemon) => {
    pokemon = pikachuSuper(pokemon);
    setBattlePokemon(pokemon)
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
    document.body.classList.add('locationBackground');
    usersPokemon.forEach((url, index) => {
      fetch(url)
        .then(response => response.json())
        .then(secondData => {
          const pokemonProps = {
            name: secondData.name,
            hp: secondData.stats[0].base_stat,
            maxHp: secondData.stats[0].base_stat,
            attack: secondData.stats[1].base_stat,
            defense: secondData.stats[2].base_stat,
            url_front: secondData.sprites.versions['generation-v']['black-white'].animated.front_default,
            url_back: secondData.sprites.versions['generation-v']['black-white'].animated.back_default
          };
          setPokeData(prevData => [...prevData, pokemonProps]);
        })
    })
  }, []);

  return (
    <div className="App" >
      {!selectedLocation && (
        data && <Locations locations={data.results} onClick={handleCountryClick} />
      )}


      {selectedLocation && isClicked && (
        <div>
          <FightLocation location={selectedLocation} onClick={handleBackClick} />
          <EnemyPokemon onFind={handleFindPokemon} battleEnemy={enemyPokemon} />
          <MyPokemons pokemons={pokeData} onBattleClick={handleBattleClick} onFightClick={handleFightClick} battlePokemon={battlePokemon} />
        </div>
      )}

      {!winning && !selectedLocation && (
        data && <Locations locations={data.results} onClick={handleCountryClick} />
      )}
    </div>
  );
}

export default App;
