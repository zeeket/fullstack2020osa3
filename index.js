const express = require('express')
const app = express()

let persons = [
  { id:1,
    name:"arto Hellas",
    number: "040-123456"
  },
  { id:2,
    name:"Ada Lovelace",
    number: "39-44-532532"
  },
  { id:3,
    name:"Dan Abramov",
    number: "040-123321"
  },
  { id:4,
    name:"Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.use(express.json()) 
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/info', (req, res) => {
  res.send(`<p>phonebook has info for ${persons.length} people</p><p> ${new Date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  person ? response.json(person):response.sendStatus(404)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  persons = persons.filter(p => p.id !== id)
  person ? response.sendStatus(202):response.sendStatus(404)
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  console.log(`person ${person}`)
  console.log(`person name ${person.name} person number ${person.number}`)
  if(!person.name||!person.number){
    response.status(400).send({error:'missing name or number'})
  } else if(persons.find(p=>p.name===person.name)) {
    response.status(400).send({error:'name must be unique'}) 
  } else {
    const newId = Math.floor(Math.random()* Math.floor(13371337)) 
    const phonebookEntry= { id:newId, name:person.name, number:person.number }
  persons.push(phonebookEntry)>0 
    response.sendStatus(202)
  }
  })

    const port = 3001
  app.listen(port)
  console.log(`Server running on port ${port}`)
