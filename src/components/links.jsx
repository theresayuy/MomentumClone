import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Modal from './modal';
import ModalButton from './modal-button';
import { getListItemsBeforeMount } from './helpers';
import { MODAL_MODIFICATION_REQUEST, MODAL_DESC } from './constants';

function Links() {
    const [bmItems, setBMItems] = useState({
        sqlData: [],
        modalListItems: []
    });
    const [modalClass, setModalClass] = useState("Modal-Hidden");

    const setItems = (newItems, index, request) => {
        if (request === MODAL_MODIFICATION_REQUEST.new) {
            axios.post("http://localhost:3000/bookmarks", newItems.sqlData[index]);
        } else {
            axios.put("http://localhost:3000/bookmarks", newItems.sqlData[index]);
        }
        setBMItems(newItems);
    } // index parameter is the index of sqlData that got changed

    useEffect(() => {
        axios.get("http://localhost:3000/bookmarks").then((res) => {
            setBMItems({ 
                sqlData: res.data,
                modalListItems: getListItemsBeforeMount(
                    MODAL_DESC.bm, 
                    () => {
                        return bmItems
                    }, 
                    setItems,
                    res.data
                )
            });
        });
    }, [bmItems]);

    return (
        <div className="Links">
            <ModalButton 
                desc="link"
                getParentState={() => {
                    return modalClass;
                }}
                renderParent={(val) => {
                    setModalClass(val);
                }}
            />
            <Modal
                desc={MODAL_DESC.bm}
                modalContentHead="Bookmarks"
                getParentState={() => {
                    return bmItems;
                }}
                renderParent={setItems}
                getParentIsOpen={() => {
                    return modalClass;
                }}
                setParentIsOpen={(val) => {
                    setModalClass(val);
                }}
            />
        </div>
    );
}

export default Links;