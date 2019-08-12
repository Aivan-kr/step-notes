let newListForm = document.forms[0];
let formGroup = document.querySelectorAll(".form-group")[1];
let addListItem = formGroup.children[0].children[1];
let listNoteTitle = document.getElementById("listTitle");


const listItemAdder = function () {
  const currentRow = this.parentElement;
  const checkBox = currentRow.querySelector("[type=checkbox]");
  if (this.value.length && this.placeholder) {
    const newRow = document.createElement("div");
    newRow.className = currentRow.className;
    formGroup.appendChild(newRow);
    newRow.innerHTML = currentRow.innerHTML;
    checkBox.hidden = null;
    newRow.lastElementChild.oninput = listItemAdder;
    this.placeholder = "";
  } else if (!this.value.length) {
    const lastRow = formGroup.lastElementChild;
    lastRow.remove();
    this.placeholder = lastRow.lastElementChild.placeholder;
    checkBox.checked = null;
    checkBox.hidden = true;
  }
};

addListItem.oninput = listItemAdder;
const showListNote = function (data) {
};

const saveListBtn = document.getElementById("saveListBtn");
saveListBtn.onclick = async function () {
  let itemRows = [...formGroup.querySelectorAll(".row")]
    .filter(row => row.children[1].value);
  let data = {
    title: listNoteTitle.value,
    listItems: itemRows.map(row => ({done: row.children[0].checked, item: row.children[1].value}))
  };
  let response = await fetch("http://localhost:3000/create", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  let {created, id} = await response.json();
  if (created) {
    itemRows.forEach(row => row.remove())
  };
 };

