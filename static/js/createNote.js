async function createNote(){
    let data = {
        title: document.getElementById('createTitle').value,
        text: document.getElementById('createText').value
    }
    let req = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()
    if(answer.created)
        window.location.href = '/'
}
