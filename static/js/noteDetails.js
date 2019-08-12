async function editNote() {
	let data = {
        id: id,
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    console.log(data)
    let req = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
}

async function deleteNote(){
	let data = {
        id: id
    }
    let req = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

}