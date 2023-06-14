import React from 'react';

function Areas({ areas, onClick, onBackClick }) {
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
      {!areas.length &&
        <div key={'lost'} className='location'>
          <h2>You are lost, go home!</h2>
          <button onClick={onBackClick}>
            Yes, captain!
          </button>
        </div>
      }
    </div>
  );
}

export default Areas;
