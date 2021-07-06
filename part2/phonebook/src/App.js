import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersonValue, setFilteredPersonValue ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([...persons])

  const addPerson = (event) => {
    event.preventDefault()
    // create object person to store the data input
    const personObject = {
      name: newName,
      number: newNumber
    }

    if ( persons.some( person => person.name.toLowerCase() === newName.toLowerCase()) ) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = persons.concat(personObject)
      // Add the input in the existing array of person
      setPersons(newPersons)
      setFilteredPersons(newPersons)
      // Reset the input string
      setNewName('')
      setNewNumber('')
      setFilteredPersonValue('')
    }
  }

  // save user input to array
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterPerson = (event) => {
    setFilteredPersonValue(event.target.value)
    // filter the array
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        text="filter shown with:"
        value={filteredPersonValue}
        handleChange={handleFilterPerson} 
      />

      <h3>Add new person</h3>

      <PersonForm 
        handleSubmit={addPerson}
        inputNameValue={newName}
        inputNameChange={handlePersonChange}
        inputNumberValue={newNumber}
        inputNumberChange={handleNumberChange}
        handleSubmitButton={addPerson}
      />

      <h3>Numbers</h3>
      
      <Persons dataPerson={filteredPersons} />
    </div>
  )
}

export default App