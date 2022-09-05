import React, { useState } from 'react';
import '../App.css';
import useLocalStorage from './helpers/local-storage';
import { getDeepCopy } from './helpers/str-arr-utils';
import { Modal, ModalButton, ModalListItem, getListItemsBeforeMount } from './modal';

const LS_KEY = "savedBMs"

function addBM(event, index, getBMState, renderBM, getStoredBMs, updateStoredBMs) {
    const listItems = getDeepCopy(getBMState().modalListItems);
    const storageItems = getDeepCopy(getStoredBMs());

    if (listItems.length === storageItems.length) {
        const NEW_STORED_ITEM = {
            id: index,
            label: "",
            url: "", 
            editFormHidden: true
        };
        const NEW_LIST_ITEM = (<ModalListItem 
            desc="bookmark"
            itemInfo={storageItems[index]}
            getParentState={getBMState}
            renderParent={renderBM}
            getStoredItems={getStoredBMs}
            updateLS={updateStoredBMs}
        />);

        if (index === listItems.length) {
            storageItems.push(NEW_STORED_ITEM);
            updateStoredBMs(storageItems);
            listItems.push(NEW_LIST_ITEM);
            renderBM({
                modalListItems: listItems,
                classModal: getBMState().classModal
            });
        } else if (index < listItems.length) {
            storageItems[index] = NEW_STORED_ITEM;
            updateStoredBMs(storageItems);
            listItems[index] = NEW_LIST_ITEM;
            renderBM({
                modalListItems: listItems,
                classModal: getBMState().classModal
            });
        }
    }

    event.preventDefault();
} // Add bookmark as a ModalListItem to Modal and update localStorage

function AddNewBMForm(props) {

}

function EditBMForm(props) {

}

function Links() {
    const [items, setItems] = useLocalStorage(LS_KEY, []);
    const [bmState, renderBM] = useState({
        modalListItems: (items !== []) ? 
                        getListItemsBeforeMount(
                            "link", // desc
                            () => {
                                return bmState;
                            }, // getParentState
                            (val) => {
                                renderBM(val);
                            }, // renderParent
                            () => {
                                return items;
                            }, // getStoredItems
                            (val) => {
                                setItems(val);
                            } // updateLS
                        ) : [],
        classModal: "Modal-Hidden"
    });

    return (
        <div className="BMs">
            <ModalButton 
                desc="link"
                getParentState={() => {
                    return bmState;
                }}
                renderParent={(val) => {
                    renderBM(val);
                }}
                updateLS={(val) => {
                    setItems(val);
                }}
                getStoredItems={() => {
                    return items;
                }} 
            />
            <Modal 
                desc="link"
                modalContentHead="Bookmarks"
                getParentState={() => {
                    return bmState;
                }}
                renderParent={(val) => {
                    renderBM(val);
                }}
            />
        </div>
    );
}

export default Links;
export { addBM, AddNewBMForm, EditBMForm };