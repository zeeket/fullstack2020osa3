require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const Person = require('./models/person')

app.use(morgan('tiny'))
app.use(express.json()) 
app.use(express.static('build'))

app.get('/info', (req, res) => {

  Person.find({}).then(persons => {
    res.send(`<p>phonebook has info for ${persons.length} people</p><p> ${new Date}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

/*
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = Person.findOne({'id':id})
  if(person){
  response.json(person)
} else {
  response.sendStatus(404)
  }
})

*/

/*
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  persons = persons.filter(p => p.id !== id)
  person ? response.sendStatus(202):response.sendStatus(404)
})
*/

app.post('/api/persons', (request, response) => {
  const person = request.body

  console.log(`saving person name ${person.name} person number ${person.number}`)

  if(person===undefined||!person.name||!person.number){
    console.log("you gave undefined name or number or person")
    response.status(400).send({error:'missing name or number'})
  }else{ //else if(Person.findOne({'name':person.name})) {
    //response.status(400).send({error:'name must be unique'}) 
  //} else {
    //const newId = Math.floor(Math.random()* Math.floor(13371337)) 
    const phonebookEntry= new Person({ name:person.name, number:person.number })
    phonebookEntry.save().then(savedPerson => {
      console.log("saved person?")
      response.json(savedPerson)
    })
 }
})

const port = (process.env.PORT||3001)
app.listen(port)
console.log(`Server running on port ${port}`)
