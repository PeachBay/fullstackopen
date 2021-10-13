import React from 'react'

const Persons = ({dataPerson, handleRemove}) => {
  return (
    <div>
      {dataPerson.map(
        person => 
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={(event) => {handleRemove(event, person.id)}}>delete</button>
        </li>
      )}
     </div>
  )
}

export default Persons