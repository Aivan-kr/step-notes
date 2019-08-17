async function editList() {
    let id = document.getElementById("container").dataset.id;
    let checked = [];
    document.querySelectorAll(".checked .label").forEach(el => checked.push(el.innerText));
    document.querySelectorAll(".checked .to-do-input").forEach(el => checked.push(el.value));
    let unchecked = [];
    document.querySelectorAll(".unchecked .label").forEach(el => unchecked.push(el.innerText));
    document.querySelectorAll(".unchecked .to-do-input").forEach(el => unchecked.push(el.value));

    let data = {
        id: id,
        title: document.getElementById('createTitle').value,
        items: {
            checked,
            unchecked
        }
    }
    let req = await fetch(`/api/lists/${id}`, {
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
}

async function deleteNote(){
    let id = document.getElementById("container").dataset.id;
    let data = {
        id: id
    }
    let req = await fetch(`/api/lists/${id}`, {
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

}
