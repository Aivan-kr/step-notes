const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({
    extended: true
})); 


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

app.get('/notes/:id', async (request, response) => {
    let note
    await app.db.find({id: request.params.id}).forEach((el) => {
        note = el
    });
    response.render('note', {note})
})

app.get("/notes", (req, res) => {
	res.render("notes")
})

app.get("/lists", (req, res) => {
    res.render('to-do')
})

app.post("/api/notes", async (req, res) => {
	try {
        await app.db.insertOne({
            id: `${Date.now()}`,
            ...req.body 
        })
    } catch (err) {
        console.log(err)
    }
    res.json({created: true})
})

app.put("/api/notes/:id", async (req, res) => {
	try {
		await app.db.updateOne({
			id: req.body.id
		}, {
			$set: {
				title: req.body.title,
				text: req.body.text
			}
		})
	} catch (err) {
		console.log(err)
	}
	res.json({edited: true})
})

app.delete("/api/notes/:id", async (req, res) => {
	try {
        await app.db.deleteOne({
            id: req.body.id
        })
    } catch (err) {
        console.log(err)
    }
    res.json({deleted: true})
})

app.listen(port, () => {
    console.log('Server: ON')
})