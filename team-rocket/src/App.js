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
    const HEALTH = 0;
    const ATTACK = 1;
    const DEFENSE = 2;
    fetch(enemyPokemon.defeat)
      .then(response => response.json())
      .then(secondData => {
        const pokemonProps = {
          name: secondData.name,
          hp: secondData.stats[HEALTH].base_stat,
          maxHp: secondData.stats[HEALTH].base_stat,
          attack: secondData.stats[ATTACK].base_stat,
          defense: secondData.stats[DEFENSE].base_stat,
          url_front: secondData.sprites.versions['generation-v']['black-white'].animated.front_default,
          url_back: secondData.sprites.versions['generation-v']['black-white'].animated.back_default
        };
        setPokeData(prevData => [...prevData, pokemonProps]);
      })
  }

  const checkIfWon = () => {
    const FINAL_HIT = 3500;
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
        setEnemyTurn(false);
      }, FINAL_HIT);
      return false;
    }
    return true;
  }

  const handleFightClick = () => {
    const LONG_HIT = 5500;
    const SHORT_HIT = 500;
    if (battlePokemon && enemyPokemon) {
      enemyPokemon.hp = calculateHP(battlePokemon, enemyPokemon)
      if (battlePokemon.name === 'pikachu' && enemyPokemon.hp <= 0) {
        playSoundEffect(pikachu)
        enemyPokemon.hit = 'pikachu'
        battlePokemon.hit = false
        setEnemyTurn(true)
        setTimeout(() => {
          checkIfWon()
        }, LONG_HIT);
      } else {
        enemyPokemon.hit = true
        battlePokemon.hit = false
        playSoundEffect(pew)
        setEnemyPokemon({ ...enemyPokemon })
        setBattlePokemon({ ...battlePokemon })
        setEnemyTurn(true)
        let isContinue = checkIfWon()
        if (isContinue) {
          setTimeout(() => {
            playSoundEffect(pew)
            battlePokemon.hp = calculateHP(enemyPokemon, battlePokemon)
            battlePokemon.hit = true
            enemyPokemon.hit = false
            setBattlePokemon({ ...battlePokemon })
            setEnemyPokemon({ ...enemyPokemon })
            isContinue = checkIfWon()
            if (isContinue) {
              setTimeout(() => {
                setEnemyTurn(false)
              }, SHORT_HIT);
            }
          }, SHORT_HIT);
        }
      }
    }
  }

  const pikachuSuper = (pokemon) => {
    pokemon = { ...pokemon }
    if (pokemon.name === 'pikachu') {
      const POWER_UP = 10;
      pokemon.hp = pokemon.hp * POWER_UP;
      pokemon.maxHp = pokemon.maxHp * POWER_UP;
      pokemon.attack = pokemon.attack * POWER_UP;
      pokemon.defense = pokemon.defense * POWER_UP;
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

  const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charmander",
    "https://pokeapi.co/api/v2/pokemon/squirtle",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
  ];

  useEffect(() => {
    document.body.classList.add('locationBackground');
    const HEALTH = 0;
    const ATTACK = 1;
    const DEFENSE = 2;
    usersPokemon.forEach((url, index) => {
      fetch(url)
        .then(response => response.json())
        .then(secondData => {
          const pokemonProps = {
            name: secondData.name,
            hp: secondData.stats[HEALTH].base_stat,
            maxHp: secondData.stats[HEALTH].base_stat,
            attack: secondData.stats[ATTACK].base_stat,
            defense: secondData.stats[DEFENSE].base_stat,
            url_front: secondData.sprites.versions['generation-v']['black-white'].animated.front_default,
            url_back: secondData.sprites.versions['generation-v']['black-white'].animated.back_default,
            hit: false
          };
          setPokeData(prevData => [...prevData, pokemonProps]);
        })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" >
      {!selectedLocation && (
        data && data.results && <Locations locationList={data.results} onClick={handleLocationClick} />
      )}

      {selectedLocation && !selectedArea && (
        data.areas && <Areas areaList={data.areas} onClick={handleAreaClick} onBackClick={handleBackClick} />
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
