import React from "react";
import $ from 'jquery';
import '../App.css';
import { addTodo } from './helpers/modal-utils';

function AddNewTaskForm(props) {
    /*
        props = {
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            }
        }
    */
    return (
        <form className="Modal-Form" id={`task-modal-form`} 
            autoComplete="off"
            onSubmit={(event) => {
                addTodo(event, {
                        content: $(`#input-new-task`).val(),
                        checked: false,
                        id: props.getParentState().modalListItems.length,
                        editFormHidden: true
                    },
                    props.getParentState, props.renderParent, "new"
                );
            }}
        >
            <input type="text"
                className="Add-New-Item-Input" 
                id="input-new-task"
                placeholder="Add a new task"
            />
        </form>
    );
}

export default AddNewTaskForm;