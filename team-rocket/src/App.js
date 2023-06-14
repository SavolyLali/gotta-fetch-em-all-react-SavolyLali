import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';
import FightLocation from './components/FightLocation';
import EnemyPokemon  from './components/EnemyPokemon';
import MyPokemons  from './components/MyPokemons';
import battleBackground from './images/battle-background.jpg';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/location?offset=0&limit=20');
  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleCountryClick = (location) => {
    setSelectedLocation(location);
    setIsClicked(true);
    setUrl(location.url)
    setBackgroundImage(battleBackground)
  };

  const handleBackClick = () => {
    setSelectedLocation(null);
    setIsClicked(false);
    setUrl('https://pokeapi.co/api/v2/location?offset=0&limit=20');
    setBackgroundImage('https://www.itl.cat/pngfile/big/101-1015310_pokemon-video-games-gameboy-keep-calm-and-wallpaper.jpg')
  };

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

  const [backgroundImage, setBackgroundImage] = useState('https://www.itl.cat/pngfile/big/101-1015310_pokemon-video-games-gameboy-keep-calm-and-wallpaper.jpg');

  useEffect(() => {
    usersPokemon.map((url, index) => {
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
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`}}>
      {!selectedLocation && (
        data && <Locations locations={data.results} onClick={handleCountryClick} />
      )}
  
      {selectedLocation && isClicked && (
        <div>
          <FightLocation location={selectedLocation} onClick={handleBackClick} />
          <EnemyPokemon />
          <MyPokemons pokemons={pokeData}/>
        </div>
      )}
    </div>
  );
}

export default App;
