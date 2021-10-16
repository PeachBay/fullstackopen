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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        let indexPerson = persons.findIndex((person) => person.name.toLowerCase() === newName.toLowerCase())
        let samePerson = persons[indexPerson]

        personService
          .update(samePerson.id, personObject)
          .then(response => {
            console.log('update success!')
            let updatePerson = persons.filter(index => index.id !== samePerson.id)
            updatePerson.push(response)
            setPersons(updatePerson)
            setFilteredPersons(updatePerson)
          })
          .catch(error => {
            console.log('fail')
          })
      }
    } else {
      // Save the new input on server
      personService
        .create(personObject)
        .then(response => {
          console.log('create success!')
          const newPersons = persons.concat(response)

          setPersons(newPersons)
          setFilteredPersons(newPersons)
          // Reset the input string
          setNewName('')
          setNewNumber('')
          setFilteredPersonValue('')
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }

  const removePerson = (event, removed) => {
    event.preventDefault()

    if (window.confirm(`Delete ${removed.id}?`)) {
      personService
      .remove(removed.id)
      .then( () => {
        console.log('delete success!')
        let newList = persons.filter( (person) => removed.id !== person.id )
  
        setPersons(newList)
        setFilteredPersons(newList)
      })
      .catch(error => {
        console.log('fail')
      })
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
      
      <Persons 
        dataPerson={filteredPersons}
        handleRemove={removePerson} />
    </div>
  )
}

export default App