import React from 'react';

function Locations({ locations, onClick }) {
  const handleButtonClick = (location) => {
    onClick(location);
  };

  return (
    <div className='locations'>
      {locations && locations.map(location => (
        <div key={location.name} className='location'>
          <h2>{location.name}</h2>
          <button onClick={() => handleButtonClick(location)}>
            Travel
          </button>
        </div>
      ))}
    </div>
  );
}

export default Locations;
