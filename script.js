let addList = document.getElementById("addList")
let inneritems = document.getElementById("inneritems")
let ulDiv = document.getElementById("ulDiv")
let ulInp = document.getElementById("ulInp")
let ulListBtn = document.getElementById("ulListBtn")
let card1 = document.getElementById("card1")
let ulHead = document.getElementById("ulHead")

addList.addEventListener("click", () => {
    ulDiv.style.display = "block";
    addList.style.display = "none";
})

function closeBtn() {
    ulDiv.style.display = "none";
    addList.style.display = "block"
}

ulListBtn.addEventListener("click", () => {

    if (ulInp.value.trim() !== "") {
        let newCard = card1.cloneNode(true); 
        newCard.style.display = "block"
        newCard.querySelector("#ulHead").textContent = ulInp.value;
        inneritems.appendChild(newCard);
        ulInp.value = ""
    }
})

function addTodo(btn) {
    let lower = btn.closest(".lower") 
    let showItems = lower.querySelector(".showItems")
    let hiddenItems = lower.querySelector(".hiddenItems")
    showItems.style.display = "none"
    hiddenItems.style.display = "block"
}


function hideCloseIcon(closeIcon) {

   
    let lower1 = closeIcon.closest(".lower")
    let showItems1 = lower1.querySelector(".showItems")
    let hiddenItems1 = lower1.querySelector(".hiddenItems")

    showItems1.style.display = "flex"
    hiddenItems1.style.display = "none"

}

function addCardbtn(ulList) {

    let lower2 = ulList.closest(".lower")
    let hidenInp = lower2.querySelector(".hidenInp")
    let showItems2 = lower2.querySelector(".showItems")
    let hiddenItems2 = lower2.querySelector(".hiddenItems")

    if (hidenInp.value.trim() === "") {

        showItems2.style.display = "flex"
        hiddenItems2.style.display = "none"

    } else {


        let card = lower2.closest(".card1")

        let newCenterDiv = document.createElement("div")
        newCenterDiv.classList.add("center")
        newCenterDiv.style.display = "flex"
        newCenterDiv.draggable = true

        let newInp = document.createElement("input")
        newInp.type = "text"
        newInp.className = ("centerInp")
        newInp.value = hidenInp.value;
        newInp.disabled = true

        let btnwrapper = document.createElement("div")
        btnwrapper.classList.add("btnparent");

        let deleteBtn = document.createElement("button")
        deleteBtn.className = "btns"
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`

        deleteBtn.onclick = function () {
            deleteTodo(deleteBtn)
        }

        let editBtn = document.createElement("button")
        editBtn.className = "btns"
        editBtn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg`


        editBtn.onclick = function () {
            editTodo(editBtn)
        }

        btnwrapper.appendChild(deleteBtn)
        btnwrapper.appendChild(editBtn)

        newCenterDiv.appendChild(newInp)
        newCenterDiv.appendChild(btnwrapper)

      
        card.insertBefore(newCenterDiv, lower2); 
        hidenInp.value = ""
    }
}

function editTodo(btn) {
    let parent = btn.closest(".center")
    let inp = parent.querySelector(".centerInp")
    let btnWrapper = parent.querySelector(".btnparent")
    let lower = parent.closest(".card1").querySelector(".lower")

    if (lower) lower.style.display = "none"
    btnWrapper.style.display = "none"

    inp.disabled = false
    inp.style.height = "40px"
    inp.style.fontSize = "16px"
    inp.focus()

    if (!parent.querySelector(".saveBtn")) {
        let saveBtn = document.createElement("button")
        saveBtn.className = "btns saveBtn"
        saveBtn.textContent = "Save"

        inp.insertAdjacentElement("afterend", saveBtn)  

        saveBtn.onclick = function () {

            inp.disabled = true
            inp.style.height = "30px"
            inp.style.fontSize = "14px"

            if (lower) lower.style.display = "block"
            btnWrapper.style.display = "flex"

            saveBtn.remove();
        }
    }
}


function deleteTodo(del) {
  
    let parent = del.closest(".center")
    parent.remove();
}


let draggedItem = null;

document.addEventListener("dragstart", function (e) {
    if (e.target.classList.contains("center")) {
        draggedItem = e.target;
        e.dataTransfer.effectAllowed = "move"; 
      
        setTimeout(() => (draggedItem.style.display = "none"), 0);
    }
});


document.addEventListener("dragover", function (e) {
    if (e.target.classList.contains("card1")) {  
        e.preventDefault();
    }
});


document.addEventListener("drop", function (e) {
    if (e.target.classList.contains("card1")) {
        e.preventDefault();
        if (draggedItem) {
            let lower = e.target.querySelector(".lower");
            e.target.insertBefore(draggedItem, lower);  
            draggedItem.style.display = "flex";
            draggedItem = null;
        }
    }
});
