import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersonValue, setFilteredPersonValue ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])
  

  // fetch data from json
  useEffect(() => {
    console.log('in effect')
    personService
      .getAll()
      .then(response => {
        console.log('personService OK')
        setPersons(response)
        setFilteredPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    // Create object person to store the data input
    const personObject = {
      name: newName,
      number: newNumber
    }

    if ( persons.some( person => person.name.toLowerCase() === newName.toLowerCase()) ) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      // Save the new input on server
      personService
        .create(personObject)
        .then(response => {
          console.log('create entry with personService OK')
          console.log(response)

          // Add the input in the existing array of person
          const newPersons = persons.concat(response)

          setPersons(newPersons)
          setFilteredPersons(newPersons)
          // Reset the input string
          setNewName('')
          setNewNumber('')
          setFilteredPersonValue('')
        })
    }
  }

  const removePerson = (event, removed) => {
    event.preventDefault()
    window.confirm(`Delete ${removed.id}?`)

    personService
    .remove(removed.id)
    .then( () => {
      console.log('delete entry with personService OK')
      let newList = persons.filter( (person) => removed.id !== person.id )

      setPersons(newList)
      setFilteredPersons(newList)
    })
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
      
      <Persons 
        dataPerson={filteredPersons}
        handleRemove={removePerson} />
    </div>
  )
}

export default App