const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

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


const createFunc = async (req, res) => {
	try {
        await app.db.insertOne({
            id: `${Date.now()}`,
            ...req.body 
        })
    } catch (err) {
        console.log(err)
    }
    res.json({created: true})
}

const editFunc = async (req, res) => {
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
}

const deleteFunc = async (req, res) => {
	try {
        await app.db.deleteOne({
            id: req.body.id
        })
    } catch (err) {
        console.log(err)
    }
    res.json({deleted: true})
}


app.get('/', async (request, response) => {
    let objFromDb = []
    await app.db.find({}).forEach(el => {
        objFromDb.push(el)
    })
    response.render('index', {objFromDb})
})

//NOTES

app.get('/notes/:id', async (request, response) => {
    let note
    console.log(request.params.id)
    await app.db.find({id: request.params.id}).forEach((el) => {
        note = el
    });
    console.log(note)
    response.render('note', {note})
})

app.get("/notes", (req, res) => {
	res.render("notes")
})

app.post("/api/notes", createFunc)

app.put("/api/notes/:id", editFunc)

app.delete("/api/notes/:id", deleteFunc)

//LISTS

app.get("/lists", (req, res) => {
	res.render("to-do")
})

app.get("/lists/:id", async (req, res) => {
	let list
    await app.db.find({id: req.params.id}).forEach((el) => {
        list = el
    });
    res.render('list', {list})

})

app.post("/api/lists", createFunc)

app.put("/api/lists/:id", editFunc)

app.delete("/api/lists/:id", deleteFunc)

app.listen(port, () => {
    console.log('Server: ON')
})