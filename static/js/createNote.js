async function createNote(){
    let data = {
        title: document.getElementById('createTitle'),
        text: document.getElementById('createText')
    }
    let req = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
}
