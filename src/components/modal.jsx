import React, {useState} from 'react';
import '../App.css';
import { addTodo, AddNewTaskForm, EditTaskForm } from './todolist';
import { addBM, AddNewBMForm, EditBMForm } from './links';
import UTIL_BTN from './constants/util-buttons';

function toggleDisplay(isHidden) {
    return (isHidden) ? "" : "-Hidden"
}

function getListItemsBeforeMount(description, getParentState, renderParent, 
    getStoredItems, updateLS) {
    const result = [];
    const items = getStoredItems();
    
    for (let i = 0; i < items.length; i++) {
        if (items[i] !== {}) {
            result.push(<ModalListItem
                desc={description} 
                itemInfo={items[i]}
                getParentState={getParentState}
                renderParent={renderParent}
                getStoredItems={getStoredItems}
                updateLS={updateLS}
            />);
        } else {
            result.push(<span></span>);
        }
    }

    return getDeepCopy(result);
} // get array of ModalListItems representing each list item

function deleteListItem(event, index, getState, renderParent, 
    getStored, updateLS) 
{
    const listItems = getDeepCopy(getState().modalListItems);
    const storedItems = getDeepCopy(getStored());

    if (listItems.length === storedItems.length && index < listItems.length) {
        listItems[index] = (<span></span>);
        storedItems[index] = {};
        updateLS(storedItems);
        renderParent({
            modalListItems: listItems,
            classModal: getState().classModal
        });
    }

    event.preventDefault();
} // removes the ModalListItem at a specific index of the array of ModalListItems

function editListItem(event, index, getState, renderParent, getStored, updateLS) {
    event.preventDefault();
} // displays the form for editing the form and makes the rest of the ModalListItem invisible

function ModalButton(props) {
    /*
        props = {
            desc: "...",
            count: 0, // integer 
            renderParent: function() {
                // do something
            },
            getParentState: function() {
                // do something
            }
        }
    */

    return (
        <button className='Modal-Button'
            id={`${props.desc}-modal-btn`}
            onClick={() => {
                props.renderParent({
                    modalListItems: props.getParentState().modalListItems,
                    classModal: "Modal" + toggleDisplay(
                        props.getParentState().classModal === "Modal-Hidden"
                    )
                });
            }}
        >
            {
                `${
                    props.desc.slice(0, 1).toUpperCase()
                }${
                    props.desc.slice(1)
                }s`
            }
        </button>
    );
}

function ModalListItem(props) {
    /*
        props = {
            desc: "...",
            itemInfo: {
                id: 0, // an integer >= 0
                label: "...",
                checked: false, // optional
                url: "..." // optional
            },
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            },
            getStoredItems: function() {
                // do something
            },
            updateLS: function() {
                // do something
            }
        }
    */

    const CSS_FAVICON = {
        backgroundImage: 
        `url(http://s2.googleusercontent.com/s2/favicons?domain_url=${
            props.itemInfo.url
        })`,
        height: "16px",
        width: "16px"
    };
    const CB_BTN = (desc === "task") ? (
                        <span
                            className="CB-Btn"
                            id={`cb-${props.desc}-list-item-${props.itemInfo.id}`}
                            title={
                                `${
                                    ((props.itemInfo.checked) ? "Unc" : "C")
                                }hecked`
                            }
                        >
                            {
                                (props.itemInfo.checked) ? UTIL_BTN.CBB : 
                                UTIL_BTN.EBB
                            }
                        </span>
                    ) : 
                    (<span></span>);
    const CONTENT = (desc === "task") ?
                    <span>{props.itemInfo.label}</span> :
                    (
                        <span>
                            <span
                                className="Favicon"
                                style={CSS_FAVICON}
                            ></span>
                            <a 
                                href={props.itemInfo.url}
                            >
                                {props.itemInfo.label}
                            </a>
                        </span>
                    );

    return (
        <li 
            className="Modal-List-Item"
            id={`${props.desc}-list-item-${props.itemInfo.id}`}
        >
            {CB_BTN}
            <span id={`${props.desc}-list-item-content-${props.itemInfo.id}`}
                className="Modal-List-Item-Content"
            >
                {CONTENT}
            </span>
            <span 
                className="Close-Btn"
                id={`clear-${props.desc}-list-item-${props.itemInfo.id}`}
                title="Clear"
                onClick={(event) => {
                    deleteListItem(event, props.itemInfo.id, props.getParentState, 
                        props.renderParent, props.getStoredItems, props.updateLS
                    );
                }}
            >
                {UTIL_BTN.X}
            </span>
            <span 
                className="Edit-Btn"
                id={`pencil-${props.desc}-list-item-${props.itemInfo.id}`}
                title="Clear"
            >
                {UTIL_BTN.PENCIL}
            </span>
            {
                (props.desc === "task") ?
                <EditTaskForm 
                    itemInfo={props.itemInfo}
                    getStoredItems={props.getStoredItems}
                    updateLS={props.updateLS}
                    getParentState={props.getParentState}
                    renderParent={props.renderParent}
                /> :
                <EditBMForm 
                    itemInfo={props.itemInfo}
                    getStoredItems={props.getStoredItems}
                    updateLS={props.updateLS}
                    getParentState={props.getParentState}
                    renderParent={props.renderParent}                
                /> 
            }
        </li>
    );
}

function Modal(props) {
    /*
        props = {
            desc: "...", 
            modalContentHead: "...",
            count: 0, // integer
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            },
            getStoredItems: function() {
                // do something
            },
            updateLS: function() {
                // do something
            }
        }
    */
    return (
        <div 
            className={props.getParentState().classModal} 
            id={`${props.desc}-modal`}
        >
            <div 
                className="Modal-Content" 
                id={`${props.desc}-modal-content`}
            >
                <div 
                    className="Modal-Content-Head" 
                    id={`${props.desc}-modal-content-head`}
                >
                    <span 
                        className='Close-Btn' 
                        id={`${props.desc}-modal-content-close`}
                        onClick={() => {
                            props.renderParent({
                                modalListItems: props.getParentState().modalListItems,
                                classModal: "Modal" + toggleModalVisibility(
                                    props.getParentState().classModal === "Modal-Hidden"
                                )
                            });
                        }}
                    >
                        {UTIL_BTN.X}
                    </span>
                    <h3>{props.modalContentHead}</h3>
                </div>
                <div
                    className="Modal-Add-New-Form"
                    id={`${props.desc}-modal-add-new-form`}
                >
                    {
                        (props.desc === "task") ? 
                        <AddNewTaskForm 
                            getStoredItems={props.getStoredItems} 
                            updateLS={props.updateLS}
                            getParentState={props.getParentState} 
                            renderParent={props.renderParent}
                        /> :
                        <AddNewBMForm 
                            getStoredItems={props.getStoredItems}
                            updateLS={props.updateLS}
                            getParentState={props.getParentState}
                            renderParent={props.renderParent}
                        />
                    }
                </div>
                <div 
                    className="Modal-Content-Body"
                    id={`${props.desc}-modal-content-body`}
                >
                    <ul id={`${props.desc}-modal-ul`}>
                        {props.getParentState().modalListItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export {Modal, ModalListItem, ModalButton, getListItemsBeforeMount};