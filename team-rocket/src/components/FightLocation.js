import React from 'react'

function FightLocation({ location, onClick }) {
  console.log(location)
  return (
    <div className='fight-location'>
      <h2>{location.name}</h2>
      <button onClick={onClick}>Back</button>
    </div>
  )
}

export default FightLocation
