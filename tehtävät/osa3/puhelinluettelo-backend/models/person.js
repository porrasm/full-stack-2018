const mongooose = require('mongoose')

const p = ''
const url = 'mongodb://porrasm:' + p + '@ds159073.mlab.com:59073/osa3-puhelinluettelo'

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

const Person = mongooose.model('Person', {
    name: String,
    number: String
})

module.exports = Person