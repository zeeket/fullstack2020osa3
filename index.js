const express = require('express')
const app = express()

const persons = [
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

app.get('/info', (req, res) => {
  res.send(`<p>phonebook has info for ${persons.length} people</p><p> ${new Date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  console.log('getting by id')
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  response.json(person)
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  console.log(person)

  response.json(note)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
