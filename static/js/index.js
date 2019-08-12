const noteList = document.querySelectorAll('.note-targ')


noteList.forEach(el => {
    el.addEventListener('click', (event) => {
        let noteId = event.target.dataset.id
        window.location.href = `/notes/${noteId}`
    })
})