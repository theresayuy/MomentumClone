import React from 'react';

import './style.css';
import { getNewItemInfo } from './utils';

import EditBMForm from "../EditBMForm";
import EditTaskForm from "../EditTaskForm";
import { toggleCheck, toggleDisplay, addListItemData, 
    formatStrMethod1} from "../../helpers";
import { UTIL_BTN, FAVICON_URL_PREFIX, MAX_STR_LEN, 
    DELETED_STR, MODAL_MODIFICATION_REQUEST, 
    MODAL_DESC } from "../../constants";

function ModalListItem(props) {
    /*
        props = {
            desc: "...",
            itemInfo: {
                id: 0, // an integer >= 0
                content: "...",
                checked: false, // optional
                url: "..." // optional
            },
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            }
        }
    */
    
    const BEGINNING = (props.desc === MODAL_DESC.tasks) ? (
            <span
                className="CB-Btn"
                id={`${props.desc}-list-item-cb-${props.itemInfo.id}`}
                title={
                    `${
                        ((props.itemInfo.checked) ? "Unc" : "C")
                    }heck`
                }
                onClick={(event) => {
                    toggleCheck(event, props.itemInfo, 
                        props.getParentState, props.renderParent   
                    );
                }}
            >
                {
                    (props.itemInfo.checked) ? UTIL_BTN.CBB : 
                    UTIL_BTN.EBB
                }
            </span> 
        ) /* if we are inserting a task, 
                put checkbox button at very left */
        : (
            <span
                className="Favicon"
                id={`favicon-bm-${props.itemInfo.id}`}
                style={{
                    backgroundImage: 
                        `url(${FAVICON_URL_PREFIX}${props.itemInfo.url})`,
                    height: "16px",
                    width: "16px"
                }}
            ></span>
        ); /* else, we are inserting bookmark, 
                so put the favicon at very left */
    const CONTENT = (props.desc === MODAL_DESC.tasks) ?
        formatStrMethod1(props.itemInfo.content, MAX_STR_LEN.listItem) 
        /* if we are inserting task, the content is whatever the 
            user typed in on add new task form */
        : (
            <a className="BM-Anchor"
                href={props.itemInfo.url}
            >
                {formatStrMethod1(props.itemInfo.content, MAX_STR_LEN.listItem)}
            </a>
        ); /* otherwise we are inserting bookmark, 
                so its content is anchor tag */

    return (
        <li 
            className="Modal-List-Item"
            id={`${props.desc}-list-item-${props.itemInfo.id}`}
        >
            <span 
                className={`Displayed-List-Item${toggleDisplay(
                    props.itemInfo.editFormHidden
                )}`}
            >
                {BEGINNING}
                <span id={`${props.desc}-list-item-content-${props.itemInfo.id}`}
                    className="Modal-List-Item-Content"
                    title={props.itemInfo.content}
                >
                    {CONTENT}
                </span>
                <span 
                    className="Close-Btn"
                    id={`${props.desc}-list-item-clear-${props.itemInfo.id}`}
                    title={`Delete ${props.desc}`}
                    onClick={(event) => {
                        addListItemData(event, 
                            getNewItemInfo(
                                props.desc, {
                                    content: DELETED_STR,
                                    editFormHidden: true
                                }, props.itemInfo
                            ), 
                            props.getParentState, 
                            props.renderParent, 
                            MODAL_MODIFICATION_REQUEST.delete
                        );
                    }}
                >
                    {UTIL_BTN.X}
                </span>
                <span 
                    className="Edit-Btn"
                    id={`${props.desc}-list-item-edit-${props.itemInfo.id}`}
                    title={`Edit ${props.desc}`}
                    onClick={(event) => {
                        addListItemData(
                            event,
                            getNewItemInfo(
                                props.desc, {
                                    content: props.itemInfo.content,
                                    editFormHidden: false
                                }, props.itemInfo
                            ),
                            props.getParentState,
                            props.renderParent,
                            MODAL_MODIFICATION_REQUEST.edit
                        );
                    }}
                >
                    {UTIL_BTN.PENCIL}
                </span>
            </span>
            {
                (props.desc === MODAL_DESC.tasks) ?
                <EditTaskForm 
                    itemInfo={props.itemInfo}
                    getParentState={props.getParentState}
                    renderParent={props.renderParent}
                /> :
                <EditBMForm 
                    itemInfo={props.itemInfo}
                    getParentState={props.getParentState}
                    renderParent={props.renderParent}            
                /> 
            }
        </li>
    );
}

export default ModalListItem;
