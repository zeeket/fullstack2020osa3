const mongoose = require('mongoose')

if (process.argv.length<3||process.argv.length===4) {
  console.log('not enough arguments')
  process.exit(1)
} 
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.zvbt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
Person.find({}).then(result => {
  console.log("phonebook:")
  result.forEach(p => {
    console.log(`${p.name} ${p.number}`)
  })
  mongoose.connection.close()
})
} else {

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(result => {
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})
}
