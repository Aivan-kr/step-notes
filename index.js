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
    let note
    await app.db.find({id: request.params.id}).forEach((el) => {
        note = el
    });
    response.render('note', {note})
})

app.get("/notes", (req, res) => {
	res.render("notes")
})

app.post("/api/notes", async (req, res) => {
	try {
        await app.db.insertOne({
            id: Date.now(),
            ...req.body 
        })

        res.redirect("/")

    } catch (err) {
        console.log(err)
    }

})

app.put("/api/notes/:id", async (req, res) => {
	try {
		console.log("edited")
		await app.db.updateOne({
			id: req.body.id
		}, {
			$set: {
				title: req.body.title,
				text: req.body.text
			}
		})
		res.redirect("/")
	} catch (err) {
		console.log(err)
	}
})

app.delete("/api/notes/:id", async (req, res) => {
	try {
        await app.db.deleteOne({
            id: req.body.id
        })
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log('Server: ON')
})