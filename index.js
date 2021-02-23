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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  console.log(`saving person name ${person.name} person number ${person.number}`)

  if(person===undefined||!person.name||!person.number||person.name===""||person.number===""){
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const port = (process.env.PORT||3001)
app.listen(port)
console.log(`Server running on port ${port}`)
