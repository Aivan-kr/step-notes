const addBtn = document.querySelector('.add-btn')

const textInput = val => {
    let input = document.createElement(`input`);
    input.value = val 
    input.className = "col-8 to-do-input form-control text-light border-left-0 border-top-0 border-right-0 border-bottom-2 border-secondary bg-dark"
    return input
}

addBtn.addEventListener('click', function addListElement() {
    let id = document.querySelectorAll(".custom-checkbox").length
    const newInput = `<div class="list-item row justify-content-sm-between align-items-baseline m-1">
                    <div class="custom-control custom-checkbox col-1">
                        <input type="checkbox" class="custom-control-input" id="u${id}">
                        <label class="custom-control-label" for="u${id}"></label>
                    </div>
                    <input class="col-8 to-do-input form-control text-light border-left-0 border-top-0 border-right-0 border-bottom-2 border-secondary bg-dark">
                    <button type="button" class="remove-btn btn btn-danger btn-sm font-weight-bolder">-</button>
                </div>`
    const cardList = document.querySelector('.unchecked')
    const newInputContainer = document.createElement('div')
    newInputContainer.innerHTML = newInput
    cardList.appendChild(newInputContainer)
})

addBtn.addEventListener('click', removeListElement)
function removeListElement() {
    const removeBtn = document.querySelectorAll('.remove-btn')
    removeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentNode.remove()
        })
    })
}

document.querySelector('.list-container').addEventListener('change', function listStatus() {
    const checkedListContainer = document.querySelector('.checked')
    const uncheckedListContainer = document.querySelector('.unchecked')
    const listItem = document.querySelectorAll('.custom-control-input')
    listItem.forEach(item => {
        if (item.checked) {
            checkedListContainer.appendChild(item.parentNode.parentNode)
        } else {
            uncheckedListContainer.appendChild(item.parentNode.parentNode)
        }
    })
})

document.body.onclick = (e) => {
    if (e.target.classList.contains("list-item"))
        e.target.querySelector(".label").click()
    if (e.target.className === "label") {
        let input = textInput(e.target.innerText);
        e.target.after(input);
        input.focus();
        e.target.remove();
        input.onblur = (e) => {
            let span = document.createElement("span");
            span.className = "label";
            span.innerText = e.target.value;
            e.target.after(span);
            e.target.remove();
        }
    }
}

removeListElement()