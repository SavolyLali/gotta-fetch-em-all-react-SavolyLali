import React, { useState, useEffect } from 'react';
import './App.css';
import Locations from './components/Locations';

function App() {
  const [data, setData] = useState(null);


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
      {data && (
        <Locations locations={data.results} />
      )}
    </div>
  );
}

export default App;
