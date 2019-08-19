document.querySelector('.create-list').addEventListener('click', async function createList() {
    let unchecked = []
    let checked = []

    const uncheckedItems = document.querySelectorAll('.unchecked .to-do-input')
    uncheckedItems.forEach(item => {
        unchecked.push(item.value)
    })

    const checkedItems = document.querySelectorAll('.checked .to-do-input')
    checkedItems.forEach(item => {
        checked.push(item.value)
    })

    let data = {
        type: 'list',
        title: document.getElementById('listTitle').value,
        items: {
            checked,
            unchecked
        }
    }

    let req = await fetch('/api/notes', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()

    if (answer.created) {
        window.location.href = '/'
    }
})