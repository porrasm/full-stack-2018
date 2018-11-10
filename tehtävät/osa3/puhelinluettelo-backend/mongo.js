const mongooose = require('mongoose')

const p = ''
const url = 'mongodb://porrasm:' + p + '@ds159073.mlab.com:59073/osa3-puhelinluettelo'

mongooose.connect(url)

const Person = mongooose.model('Person', {
    name: String,
    number: String,
})

if (process.argv.length == 4) {

    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })

    person
        .save()
        .then(response => {
            console.log('\nadded ' + response.name + ' with number ' + response.number)
            mongooose.connection.close()
        })

} else {

    Person 
        .find({})
        .then(result => {

            console.log("\npunelinluettelo:")

            result.forEach(person => {
                console.log(person.name + ' ' + person.number)
            })

            mongooose.connection.close()
        })

}