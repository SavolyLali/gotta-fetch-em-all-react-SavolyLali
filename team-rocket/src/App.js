import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';
import FightLocation from './components/FightLocation';

function App() {
/*   const [url, setUrl] = useState('https://pokeapi.co/api/v2/location?offset=0&limit=20');
 */  const [data, setData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleCountryClick = (location) => {
    setSelectedLocation(location);
    setIsClicked(true);
  };


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/location?offset=0&limit=20')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, []);


  return (
    <div className="App">
      {data && !isClicked && (
        <Locations locations={data.results} onClick={handleCountryClick}/>
      )}

      {isClicked && (
        <FightLocation location={selectedLocation} />
      )}
    </div>
  );
}

export default App;
