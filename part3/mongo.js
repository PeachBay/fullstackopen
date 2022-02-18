const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tiffenydev:<password>@cluster0.yyh3v.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

/* Show person list from database with cmd-line : password */
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(people => {
      console.log(people)
    })
    mongoose.connection.close()
  })
} 
/* Add new person into database with cmd-line : password name number */
else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  
  person.save().then( () => {
    console.log(`added name ${process.argv[3]} and number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}