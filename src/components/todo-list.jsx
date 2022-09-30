import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Modal from './modal';
import ModalButton from './modal-button';
import { getListItemsBeforeMount, getDeepCopy } from './helpers';
import { MODAL_MODIFICATION_REQUEST, MODAL_DESC, 
    TABLE_AXIOS_URL } from './constants';

function TodoList() {
    const [todoItems, setTodoItems] = useState({
        sqlData: [],
        modalListItems: [],
    });
    const [isOpen, setIsOpen] = useState("Modal-Hidden");

    const setItems = (newItems, index, request) => {
        if (request === MODAL_MODIFICATION_REQUEST.new) {
            axios.post(TABLE_AXIOS_URL.tasks, newItems.sqlData[index]);
        } else {
            axios.put(TABLE_AXIOS_URL.tasks, newItems.sqlData[index]);
        }
        // console.log(JSON.stringify(newItems.sqlData[index]));
        setTodoItems(newItems);
    } // index parameter is the index of sqlData that got changed

    useEffect(() => {
        axios.get(TABLE_AXIOS_URL.tasks).then((res) => {
            setTodoItems({
                sqlData: getDeepCopy(res.data),
                modalListItems: getListItemsBeforeMount(
                    MODAL_DESC.tasks, 
                    () => {
                        return todoItems
                    }, 
                    setItems,
                    res.data
                )
            });
        });
    }, [todoItems]);
    
    return (
        <div className="Todolist">
            <Modal
                desc={MODAL_DESC.tasks}
                modalContentHead="Today"
                getParentState={() => {
                    return todoItems;
                }}
                renderParent={setItems}
                getParentIsOpen={() => {
                    return isOpen;
                }}
                setParentIsOpen={(val) => {
                    setIsOpen(val);
                }}
            />
            <ModalButton 
                desc={MODAL_DESC.tasks}
                getParentState={() => {
                    return isOpen;
                }}
                renderParent={(val) => {
                    setIsOpen(val);
                }}
            />
        </div>
    );
}

export default TodoList;