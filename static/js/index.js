const noteList = document.querySelectorAll('.note-targ')
console.log(noteList);

noteList.forEach(el => {
    el.addEventListener('click', (event) => {
        let noteId = event.target.dataset.id
        window.location.href = `${noteId}`
    })
})