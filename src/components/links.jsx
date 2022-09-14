import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { getListItemsBeforeMount } from './helpers/modal-utils';
import Modal from './modal';
import ModalButton from './modalbutton';

function Links() {
    const [bmState, renderBM] = useState({
        modalListItems: [],
        classModal: "Modal-Hidden"
    });

    const setState = (newState, index) => {
        if (newState.sqlData.length > bmState.sqlData.length &&
            index === bmState.sqlData.length) 
        {
            axios.post("http://localhost:3000/tasks", newState.sqlData[index]);
        } else if (newState.sqlData.length === bmState.sqlData.length && 
            index < bmState.sqlData.length) 
        {
            axios.put("http://localhost:3000/tasks", newState.sqlData[index]);
        }
        renderBM(newState);
    } // index parameter is the index of sqlData that got changed

    useEffect(() => {
        axios.get("http://localhost:3000/bookmarks").then((res) => {
            renderBM({
                sqlData: res.data,
                modalListItems: getListItemsBeforeMount(
                    "link", 
                    () => {
                        return bmState
                    }, 
                    setState,
                    res.data
                ),
                classModal: bmState.classModal
            });
        });
    }, []); // update list of bookmarks right after mount

    return (
        <div className="BMs">
            <ModalButton 
                desc="link"
                getParentState={() => {
                    return bmState;
                }}
                renderParent={setState}
            />
            <Modal
                desc="link"
                modalContentHead="Bookmarks"
                getParentState={() => {
                    return bmState;
                }}
                renderParent={setState}
            />
        </div>
    );
}

export default Links;