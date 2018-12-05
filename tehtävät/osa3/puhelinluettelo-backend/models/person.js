const mongooose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
    }

const url = process.env.MONGODB_URI

console.log('URL' + url)

mongooose.connect(url)



// personSchema.statics.findByName = function(name, cb) {
//     return this.find({ name: new RegExp(name, 'i') }, cb);
//   };

// personSchema.statics.format = function(person) {
//     return ({
//         name: person.name,
//         number: person.number,
//         id: person._id
//     })
// }

const personSchema = mongooose.Schema({
    name: String,
    number: String
}) 
    
personSchema.statics.format = (person) => {
    return({
        name: person.name,
        number: person.number,
        id: person._id
    })
}

const Person = mongooose.model('Person', personSchema)

module.exports = Person