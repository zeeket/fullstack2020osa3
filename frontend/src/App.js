import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const sameName = persons.find(p => p.name === newName)
    if(!sameName) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotifMessage(
            `${returnedPerson.name} was added`
          )
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })

    } else if(sameName.number !== newNumber){
      personService
        .update(sameName.id,{...sameName, number:newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p ))
          setNewName('')
          setNewNumber('')
          setNotifMessage(
            `${returnedPerson.name}'s number was changed`
          )
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
    } else {

      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDeletePerson = (id) => {
    const tbd = persons.find(person => person.id === id).name
    if(window.confirm(`Are you sure you want to delete ${tbd} ?`)){
      personService.deletePerson(id)

      setNotifMessage(
        `${tbd} was deleted`
      )
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase()))




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} />
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <Persons personsToShow = {personsToShow} handleDeletePerson= {handleDeletePerson} />
    </div>
  )

}

export default App
