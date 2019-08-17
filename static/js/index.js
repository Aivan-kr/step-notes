const noteList = document.querySelectorAll('.note-targ')
const todoList = document.querySelectorAll('.list-targ')


noteList.forEach(el => {
    el.addEventListener('click', (event) => {
        let noteId = event.target.dataset.id
        window.location.href = `/notes/${noteId}`
    })
})

todoList.forEach(el => {
    el.addEventListener('click', (event) => {
    	if (event.target.classList.contains("card-body")) {
	        let listId = event.target.dataset.id
	        window.location.href = `/lists/${listId}`
	    }
    })
})