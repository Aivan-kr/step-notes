async function editNote() {
	let id = window.location.pathname.slice(7)
	let data = {
        id: id,
        title: document.getElementById('createTitle'),
        text: document.getElementById('createText')
    }
    let req = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
}

async function deleteNote(){
	let id = window.location.pathname.slice(7)
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