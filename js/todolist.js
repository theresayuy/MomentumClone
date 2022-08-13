/**
 * JS for the todo list modal functionality
 * 
 * Features of the todo list:
 *      Add or remove strikethrough through each task to mark as complete/incomplete
 *      Edit the contents of each task
 *      Delete task from list
 * 
 * ISSUES:
 *      Each <li></li> item is indented really badly and the entire list closes in on itself
 */

var todoModal = $("#todo-modal")[0]; // the modal that contains the to do list and the text field to add a new to do
var openTodos = $("#todo-btn")[0]; // the button that opens the modal
var closeTodos = $("#todo-close")[0]; // span element that closes the modal
var todoForm = $("#todo-modal-form")[0]; // form for adding new tasks
var todoUL = $("#todo-modal-ul")[0]; // unordered list for each task
const MAX_STR_LEN2 = 40;
var savedTodos = [];

function addTaskListeners(i) {
    $(`#edit-todo-task-${i}`)[0].addEventListener("submit", function(event) {
        if ($(`#todo-task-editor-${i}`).val().trim() !== "") {
            if ($(`#todo-task-editor-${i}`).val().length >= MAX_STR_LEN2 ) {
                savedTodos[i]["task"] = `${$(`#todo-task-editor-${i}`).val().substring(0, MAX_STR_LEN2)}...`
            } else {
                savedTodos[i]["task"] = $(`#todo-task-editor-${i}`).val();
            }

            window.localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
            $(`p.todo-task.item-${i}`).html(savedTodos[i]["task"]);
            $(`#edit-todo-task-${i}`).hide();
            $(`.todo-task.item-${i}`).show();
            $(`.close.todo-task.item-${i}`).show();
            $(`.edit.todo-task.item-${i}`).show();
            $(`.cb.todo-task.item-${i}`).show();
        }
        event.preventDefault();
    }, false);
    $(`.close.todo-task.item-${i}`)[0].addEventListener("click", function() {
        $(`#item-${i}`).remove();
        savedTodos[i]["removed"] = true; 
        window.localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
    }, false); // now the task can be removed
    $(`.edit.todo-task.item-${i}`)[0].addEventListener("click", function() {
        $(`#edit-todo-task-${i}`).show();
        $(`.todo-task.item-${i}`).hide();
        $(`.close.todo-task.item-${i}`).hide();
        $(`.edit.todo-task.item-${i}`).hide();
        $(`.cb.todo-task.item-${i}`).hide();        
    }, false); // now the task can be modified
    $(`.cb.todo-task.item-${i}`)[0].addEventListener("click", function() {
        if ($(`.cb.todo-task.item-${i}`).html() === "\u2611") { // if the task is crossed out
            $(`.cb.todo-task.item-${i}`).html("&#9744;"); // uncheck it
            $(`#item-${i}`).css("text-decoration", "none"); // uncross it out
            $(`.cb.todo-task.item-${i}`).attr("title", "Check");
        } else {
            $(`.cb.todo-task.item-${i}`).html("&#9745;"); // check it
            $(`#item-${i}`).css("text-decoration", "line-through"); // cross it out
            $(`.cb.todo-task.item-${i}`).attr("title", "Uncheck");
        }

        savedTodos[i]["checked"] = !savedTodos[i]["checked"];
        window.localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
    }, false);
}

/**
 * Adds a new <li></li> tag representing a to do in the unordered list
 */
function addTaskToUL(i) {
    const TASKCONTENT = `<p class=\"todo-task item-${i}\">${savedTodos[i]["task"]}</p>`;
    const TASKCLOSE = `<span class=\"close todo-task item-${i}\" title=\"Clear\">&times;</span>`; // HTML Code for the close button
    const TASKEDIT = `<span class=\"edit todo-task item-${i}\" title=\"Edit\">&#9998;</span>`; // HTML Code for the edit button
    const TASKCHECK = `<span class=\"cb todo-task item-${i}\" title=\"Check\">&#9744;</span>`; // HTML Code for unchecked check box
    const TASKEDITFORM = `<form id=\"edit-todo-task-${i}\" autocomplete=\"off\"><input type=\"text\" class=\"editor-input\" id=\"todo-task-editor-${i}\" placeholder=\"Task\" value=\"${savedTodos[i]["task"]}\"></form>`
    $(todoUL).html(`${$(todoUL).html()}<li id=\"item-${i}\">${TASKCLOSE}${TASKEDIT}${TASKCHECK}${TASKCONTENT}${TASKEDITFORM}</li>`);
    $("#todo-text").val("");
    $(`#edit-todo-task-${i}`).hide()

    if (savedTodos[i]["checked"]) {
        $(`.cb.todo-task.item-${i}`).html("&#9745;"); // check it
        $(`#item-${i}`).css("text-decoration", "line-through"); // cross it out
        $(`.cb.todo-task.item-${i}`).attr("title", "Uncheck");
    } 
}

/**
 * Adds the task to the todo list modal 
 */
function addTask(event) {
    var task = "";
    // Add non empty tasks to the todo list
    if ($("#todo-text").val().trim() !== "") {
        if ($("#todo-text").val().length >= MAX_STR_LEN2) {
            // cut off task after MAX_STR_LEN2 characters
            task = `${$("#todo-text").val().substring(0, MAX_STR_LEN2)}...`;
        } else {
            // include entire task
            task = $("#todo-text").val();
        }
        savedTodos.push({"task":task, "checked":false, "removed":false});
        window.localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
        addTaskToUL(savedTodos.length - 1);
        
        for (let j = 0; j < savedTodos.length; j++) {
            if (!savedTodos[j]["removed"]) {
                addTaskListeners(j);
            }
        }
    }
    event.preventDefault();
}

openTodos.addEventListener("click", function() {
    $(todoModal).fadeIn(200);
    $(todoModal).show();
}, false); // add listener to button so that it will open the modal when clicked
closeTodos.addEventListener("click", function() {
    $(todoModal).css("display", "none");
}, false); // add listener to the x button so that it will close the modal when clicked
todoForm.addEventListener("submit", addTask, false); // add listener to the form to add task to todo list

// load previously entered tasks if they exist
if (window.localStorage.getItem("savedTodos")) {
    savedTodos = JSON.parse(window.localStorage.getItem("savedTodos"));
    var totalTasksPresent = 0;

    for (let k = 0; k < savedTodos.length; k++) {
        if (!savedTodos[k]["removed"]) {
            totalTasksPresent += 1;
        }
    }

    if (totalTasksPresent === 0) {
        window.localStorage.removeItem("savedTodos");
        savedTodos = [];
    } else {
        for (let k = 0; k < savedTodos.length; k++) {
            if (!savedTodos[k]["removed"]) {
                addTaskToUL(k);
            }
        }
    
        for (let k = 0; k < savedTodos.length; k++) {
            if (!savedTodos[k]["removed"]) {
                addTaskListeners(k);
            }
        }
    }
}