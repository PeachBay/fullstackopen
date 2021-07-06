import React from 'react'

const Persons = ({dataPerson}) => {
  return (
    <div>
      {dataPerson.map(
        person => 
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      )}
     </div>
  )
}

export default Persons