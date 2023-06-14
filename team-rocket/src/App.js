import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';
import Areas from './components/Areas';
import FightLocation from './components/FightLocation';
import EnemyPokemon from './components/EnemyPokemon';
import MyPokemons from './components/MyPokemons';
import pew from './sounds/bamboo.mp3';
import win from './sounds/battle-win.mp3';
import lose from './sounds/gameover.wav';
import pikachu from './sounds/pikachu.mp3';

function App() {

  const playSoundEffect = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const [url, setUrl] = useState('https://pokeapi.co/api/v2/location?offset=0&limit=20');
  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [battlePokemon, setBattlePokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [enemyTurn, setEnemyTurn] = useState(false);
  const [pokeData, setPokeData] = useState([]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setUrl(location.url)
  };

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setUrl(area.url)
    document.body.classList.remove('locationBackground');
    document.body.classList.add('fightBackground');
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
    setSelectedArea(null);
    setBattlePokemon(null)
    setEnemyPokemon(null)
    setEnemyTurn(false)
    setUrl('https://pokeapi.co/api/v2/location?offset=0&limit=20');
    document.body.classList.remove('fightBackground');
    document.body.classList.add('locationBackground');
  };

  const handleFindPokemon = (pokemon) => {
    setEnemyPokemon({ ...pokemon });
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

  const addNewPokemon = () => {
    fetch(enemyPokemon.defeat)
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
  }

  const winning = () => {
    if (!enemyPokemon || !enemyPokemon || enemyPokemon.hp <= 0 || battlePokemon.hp <= 0) {
      if (!enemyPokemon || enemyPokemon.hp <= 0) {
        playSoundEffect(win)
        console.log('you won');
        addNewPokemon();
      } else {
        playSoundEffect(lose)
        console.log('you lost')
      }
      setTimeout(() => {
        battlePokemon.hit = false
        enemyPokemon.hit = false
        handleBackClick();
      }, 500);
      return false;
    }
    return true;
  }

  const handleFightClick = () => {
    if (battlePokemon && enemyPokemon) {
      enemyPokemon.hp = calculateHP(battlePokemon, enemyPokemon)
      if (battlePokemon.name === 'pikachu' && enemyPokemon.hp <= 0) {
        playSoundEffect(pikachu)
        enemyPokemon.hit = 'pikachu'
        battlePokemon.hit = false
        /*setEnemyPokemon({ ...enemyPokemon })
        setBattlePokemon({ ...battlePokemon })*/
        setEnemyTurn(true)
        setTimeout(() => {
          winning()
        }, 5500);
      } else {
        enemyPokemon.hit = true
        battlePokemon.hit = false
        playSoundEffect(pew)
        setEnemyPokemon({ ...enemyPokemon })
        setBattlePokemon({ ...battlePokemon })
        setEnemyTurn(true)
        const win = winning()
        if (win) {
          setTimeout(() => {
            playSoundEffect(pew)
            battlePokemon.hp = calculateHP(enemyPokemon, battlePokemon)
            battlePokemon.hit = true
            enemyPokemon.hit = false
            setBattlePokemon({ ...battlePokemon })
            setEnemyPokemon({ ...enemyPokemon })
            winning()
            setTimeout(() => {
              setEnemyTurn(false)
            }, 500);
          }, 500);
        }
      }
    }
  }

  const pikachuSuper = (pokemon) => {
    pokemon = { ...pokemon }
    if (pokemon.name === 'pikachu') {
      pokemon.hp = pokemon.hp * 10;
      pokemon.maxHp = pokemon.maxHp * 10;
      pokemon.attack = pokemon.attack * 10;
      pokemon.defense = pokemon.defense * 10;
    }
    return pokemon
  }

  const handleBattleClick = (pokemon) => {
    pokemon = { ...pokemon }
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
            url_back: secondData.sprites.versions['generation-v']['black-white'].animated.back_default,
            hit: false
          };
          setPokeData(prevData => [...prevData, pokemonProps]);
        })
    })
  }, []);

  return (
    <div className="App" >
      {!selectedLocation && (
        data && data.results && <Locations locations={data.results} onClick={handleLocationClick} />
      )}

      {selectedLocation && !selectedArea && (
        data.areas && <Areas areas={data.areas} onClick={handleAreaClick} onBackClick={handleBackClick} />
      )}

      {selectedLocation && selectedArea && data.pokemon_encounters && (
        <div>
          <FightLocation location={selectedLocation} onClick={handleBackClick} />
          <EnemyPokemon onFind={handleFindPokemon} battleEnemy={enemyPokemon} enemyList={data.pokemon_encounters} />
          <MyPokemons pokemons={pokeData} onBattleClick={handleBattleClick} onFightClick={handleFightClick} battlePokemon={battlePokemon} enemyTurn={enemyTurn} />
        </div>
      )}
    </div>
  );
}

export default App;
