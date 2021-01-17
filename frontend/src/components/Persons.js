import React from 'react'

const Persons = (props) => {
  return (
      <h2>Numbers</h2>,
      (props.personsToShow).map(person =>
        <p key={person.name}> {person.name} {person.number}<button onClick={()=>props.handleDeletePerson(person.id)}>delete</button> </p>) 
  )
}
export default Persons
