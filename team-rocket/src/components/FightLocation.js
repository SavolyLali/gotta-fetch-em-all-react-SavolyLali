import React from 'react'

function FightLocation({location, onClick}) {
  return (
    <div>
        <h2>{location.name}</h2>
        <button onClick={onClick}>Back</button>
    </div>
  )
}

export default FightLocation
