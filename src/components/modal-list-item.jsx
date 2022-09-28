import React from 'react';
import './style.css';
import EditBMForm from './edit-bm-form';
import EditTaskForm from './edit-task-form';
import { toggleCheck, toggleDisplay, addListItemData, 
    getDeepCopy, formatStrMethod1} from './helpers';
import { UTIL_BTN, FAVICON_URL_PREFIX, MAX_STR_LEN, 
    DELETED_STR, MODAL_MODIFICATION_REQUEST, 
    MODAL_DESC } from './constants';

function getNewItemInfo(desc, newItemInfo, oldItemInfo) {
    /*
        newItemInfo = {
            editFormHidden: true,
            content: "..."
            // has url or checked field
        }

        desc = "link" || "task"

        oldItemInfo = {
            editFormHidden: true,
            content: "...",
            id: 0,
            // has url or checked field           
        }
    */
        
    const data = {
        content: newItemInfo.content, 
        id: oldItemInfo.id,
        editFormHidden: newItemInfo.editFormHidden
    };
    const extraKey = (desc === MODAL_DESC.tasks) ? "checked" : "url";
    data[extraKey] = oldItemInfo[extraKey];
    console.log(JSON.stringify(data));
    return data;
} /* tries to distinguish bookmarks from tasks and returns a js 
        object with the fields from newItemInfo, and with the
        id and either the url or checked fields from 
        oldItemInfo (depends on whether its a bookmark or a task)
*/

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
                                    content: getDeepCopy(DELETED_STR),
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
