import React from "react";
import $ from 'jquery';
import '../App.css';
import { addTodo, toggleDisplay } from './helpers/modal-utils';

function EditTaskForm(props) {
    /*
        props = {
            itemInfo: {},
            editFormHidden: true,
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            }
        }
    */
   
    return (
        <form
            className={`Edit-Item-Form${toggleDisplay(!props.itemInfo.editFormHidden)}`}
            id={`edit-task-list-item-${props.itemInfo.id}`}
            autoComplete="off"
            onSubmit={(event) => {
                addTodo(event, {
                        content: $(`#task-editor-${props.itemInfo.id}`).val(),
                        checked: false,
                        id: props.itemInfo.id,
                        editFormHidden: true
                    }, 
                    props.getParentState, props.renderParent, "new"
                );
            }}  
        >
            <input 
                type="text" className="Edit-Item-Form-Input"
                id={`task-editor-${props.itemInfo.id}`} 
                placeholder={`Edit this task`}
            />
        </form>
    );
}

export default EditTaskForm;