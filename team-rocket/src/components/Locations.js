

import React from 'react';

function Locations({ locationList, onClick }) {
  return (
    <div className='locationGrid'>
      {locationList.map((location) => (
        <div key={location.name} className='location'>
          <h2>{location.name}</h2>
          <button onClick={() => onClick(location)}>
            Travel
          </button>
        </div>
      ))}
    </div>
  );
}

export default Locations;

