const express = require('express')
const app = express()
const port = 4000

app.use(express.static(__dirname + '/static'))
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@test-cqqsr.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    console.log('MongoDB error: ' + err)
    const collection = client.db("step_project").collection("notes");
    app.db = collection
});

app.get('/', async (request, response) => {
    let note = []
    await app.db.find({}).forEach(el => {
        note.push(el)
    })
    response.render('index', {note})
})

app.get('/:id', async (request, response) => {
    let note = []
    await app.db.find({id: request.params.id}).forEach((el) => {
        note.push(el)
    });
    response.render('note', {note})
})

app.listen(port, () => {
    console.log('Server: ON')
})