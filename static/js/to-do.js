function addListElement() {
    const newInput = `<div class="row justify-content-sm-between align-items-baseline ml-1 mr-1">
         <input type="text" placeholder="Text" class="col-md-10 to-do-input form-control text-light border-left-0 border-top-0 border-right-0 border-bottom-2 border-secondary bg-dark">
         <button type="button" class="remove-btn btn btn-danger mt-3 font-weight-bolder">-</button>
      </div>`
    const cardList = document.querySelector('#card-body')
    const addBtn = document.querySelector('#add-btn')
    const newInputContainer = document.createElement('div')
    newInputContainer.innerHTML = newInput
    cardList.insertBefore(newInputContainer, addBtn)
}

function removeListElement() {
    const removeBtn = document.querySelectorAll('.remove-btn')
    removeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentNode.remove()
        })
    })
}

function listStatus() {
    const checkedListContainer = document.querySelector('.checked')
    const uncheckedListContainer = document.querySelector('.unchecked')
    const listItem = document.querySelectorAll('.custom-control-input')
    listItem.forEach(item => {
        if (item.checked) {
            checkedListContainer.appendChild(item.parentNode)
        } else {
            uncheckedListContainer.appendChild(item.parentNode)
        }
    })

}