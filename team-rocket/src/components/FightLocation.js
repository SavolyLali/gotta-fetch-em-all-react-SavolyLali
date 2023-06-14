import React from 'react'

function FightLocation({location, onClick}) {
  return (
<<<<<<< HEAD
    <div id="fightLocation">
=======
    <div className='fight-location'>
>>>>>>> 61f5822132eb6e15d74159572ee25c44a53ce581
        <h2>{location.name}</h2>
        <button onClick={onClick}>Back</button>
    </div>
  )
}

export default FightLocation
