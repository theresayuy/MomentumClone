import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Modal from './modal';
import ModalButton from './modalbutton';
import { getListItemsBeforeMount } from './helpers/modal-utils';
import { getDeepCopy } from './helpers/str-arr-utils';

function TodoList() {
    const [todolistState, renderTodolist] = useState({
        sqlData: [],
        modalListItems: [],
        classModal: "Modal-Hidden"
    });

    const setState = (newState, index) => {
        if (newState.sqlData.length > todolistState.sqlData.length &&
            index === todolistState.sqlData.length) 
        {
            axios.post("http://localhost:3000/tasks", newState.sqlData[index]);
        } else if (newState.sqlData.length === todolistState.sqlData.length && 
            index < todolistState.sqlData.length) 
        {
            axios.put("http://localhost:3000/tasks", newState.sqlData[index]);
        }
        renderTodolist(newState);
    } // index parameter is the index of sqlData that got changed

    useEffect(() => {
        axios.get("http://localhost:3000/tasks").then((res) => {
            renderTodolist({
                sqlData: getDeepCopy(res.data),
                modalListItems: getListItemsBeforeMount(
                    "task", 
                    () => {
                        return todolistState
                    }, 
                    setState,
                    res.data
                ),
                classModal: todolistState.classModal
            });
        });
    }, [todolistState]); // update the reviews right after mount
    
    return (
        <div className="Todolist">
            <Modal
                desc="task"
                modalContentHead="Today"
                getParentState={() => {
                    return todolistState;
                }}
                renderParent={setState}
            />
            <ModalButton 
                desc="task"
                getParentState={() => {
                    return todolistState;
                }}
                renderParent={setState}
            />
        </div>
    );
}

export default TodoList;