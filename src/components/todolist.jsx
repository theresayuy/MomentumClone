import React, { useState } from 'react';
import '../App.css';
import { Modal, ModalListItem, ModalButton, getListItemsBeforeMount } from './modal';
import useLocalStorage from './helpers/local-storage';
import { getDeepCopy } from './helpers/str-arr-utils';

const LS_KEY = "savedTasks";

function addTodo(event, index, getState, renderTodoList, 
                    getStored, updateLS) {
    const listItems = getDeepCopy(getState().modalListItems);                    
    const storedTodos = getDeepCopy(getStored());
    
    if (listItems.length === storedTodos.length) {
        const NEW_STORED_TODO = {
            id: index,
            label: "",
            checked: false,
            editFormHidden: true
        }
        const NEW_ITEM_TODO = (<ModalListItem 
            desc="task"
            itemInfo={NEW_STORED_TODO}
            getParentState={getState}
            renderParent={renderTodoList}
            getStoredItems={getStored}
            updateLS={updateLS}
        />);

        if (index === listItems.length) {
            storedTodos.push(NEW_STORED_TODO);
            updateLS(storedTodos);
            listItems.push(NEW_ITEM_TODO);
            renderTodoList({
                modalListItems: listItems,
                classModal: getState().classModal
            });
        } else if (index < listItems.length) {
            storedTodos[index] = NEW_STORED_TODO;
            updateLS(storedTodos);
            listItems[index] = NEW_ITEM_TODO;
            renderTodoList({
                modalListItems: listItems,
                classModal: getState().classModal
            });
        }
    }
    event.preventDefault();
} // Add task as a ModalListItem to Modal and update localStorage

function EditTaskForm(props) {
    /*
        props = {
            itemInfo: {},
            getStoredItems: function() {
                // do something
            },
            updateLS: function() {
                // do something
            },
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
            className="Edit-Item-Form-Hidden"
            id={`edit-task-list-item-${props.itemInfo.id}`}
            autoComplete="off"
            onSubmit={(event) => {
                    addTodo(event, props.itemInfo.id, 
                            props.getParentState, props.renderParent,
                            props.getStoredItems, props.updateLS);
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

function AddNewTaskForm(props) {
    /*
        props = {
            getStoredItems: function() {
                // do something
            },
            updateLS: function() {
                // do something
            },
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
            autocomplete="off"
            onSubmit={(event) => {
                if (props.desc === "task") {
                    addTodo(event, props.getStoredItems().length,
                                props.getParentState, props.renderParent,
                                props.updateLS, props.getStoredItems);
                }
            }}
        >
            <input type="text"
                className='Editor-Input' id={`input-new-task`} 
                placeholder={`Add a new task`}
            />
        </form>
    );
}

function TodoList() {
    const [items, setItems] = useLocalStorage(LS_KEY, []);
    const [todolistState, renderTodolist] = useState({
        modalListItems: (items !== []) ? 
                        getListItemsBeforeMount(
                            "task", // desc
                            () => {
                                return todolistState;
                            }, // getParentState
                            (val) => {
                                renderTodolist(val);
                            }, // renderParent
                            () => {
                                return items;    
                            }, // getStoredItems
                            (val) => {
                                setItems(val);
                            } // updateLS
                        ) : 
                        [],
        classModal: "Modal-Hidden"
    });
    
    return (
        <div
            className='Todolist'
        >
            <Modal
                desc="task"
                modalContentHead="Today"
                count={todolistState}
                getParentState={() => {
                    return todolistState;
                }}
                renderParent={(val) => {
                    renderTodolist(val);
                }}
                getStoredItems={() => {
                    return items;
                }}
                updateLS={(val) => {
                    setItems(val);
                }}
            />
            <ModalButton 
                desc="task"
                count={todolistState}
                getParentState={() => {
                    return todolistState;
                }}
                renderParent={(val) => {
                    renderTodolist(val);
                }}
            />
        </div>
    );
}

export default TodoList;
export { addTodo, AddNewTaskForm, EditTaskForm };
