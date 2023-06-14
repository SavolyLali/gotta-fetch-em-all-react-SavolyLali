import React from 'react';

function Areas({ areas, onClick }) {
  const handleButtonClick = (area) => {
    onClick(area);
  };

  return (
    <div className='locations'>
      {areas && areas.map(area => (
        <div key={area.name} className='location'>
          <h2>{area.name}</h2>
          <button onClick={() => handleButtonClick(area)}>
            Travel
          </button>
        </div>
      ))}
    </div>
  );
}

export default Areas;
