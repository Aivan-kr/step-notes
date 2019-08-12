app.get("/notes", (req, res) => {
	res.render("notes")
})

app.post("/api/notes", async (req, res) => {
	try {
        // Создаем в базе заметку
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