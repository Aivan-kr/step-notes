document.querySelector('.note-save-btn').addEventListener('click', async function editNote() {
	let id = window.location.pathname.slice(7)
	let data = {
        id: id,
        title: document.getElementById('createTitle').value,
        text: document.getElementById('createText').value
    }
    let req = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    if(answer.edited){
    	window.location.href = '/'
    }
})

document.querySelector('.note-delete-btn').addEventListener('click', async function deleteNote(){
	let id = window.location.pathname.slice(7)
	let data = {
        id: id
    }
    let req = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()
    if(answer.deleted){
    	window.location.href = '/'
    }
})