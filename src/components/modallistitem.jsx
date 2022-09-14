import React from 'react';
import EditBMForm from './editbmform';
import EditTaskForm from './edittaskform';
import { toggleCheck, toggleDisplay, addTodo } from './helpers/modal-utils';
import { getDeepCopy, formatStrMethod1 } from './helpers/str-arr-utils';
import UTIL_BTN from './constants/util-buttons';
import FAVICON_URL from './constants/google-s2-favicon';
import DELETED_STR from './constants/listitem-del';

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

    const CSS_FAVICON = {
        backgroundImage: 
        `url(${FAVICON_URL}${props.itemInfo.url})`,
        height: "16px",
        width: "16px"
    };
    const BEGINNING = (props.desc === "task") ? (
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
        put checkbox button before the label */
        : (
            <span
                className="Favicon"
                id={`favicon-bm-${props.itemInfo.id}`}
                style={CSS_FAVICON}
            ></span>
        ); /* otherwise, we are inserting bookmark, 
        so put the favicon before label */
    const CONTENT = (props.desc === "task") ?
        formatStrMethod1(props.itemInfo.content, 24) /* if we are inserting task, 
        the content is whatever the user typed in on add new task form */
        : (
            <a className="BM-Anchor"
                href={props.itemInfo.url}
            >
                {formatStrMethod1(props.itemInfo.content, 24)}
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
                        addTodo(event, {
                            content: getDeepCopy(DELETED_STR),
                            checked: props.itemInfo.checked, 
                            id: props.itemInfo.id,
                            editFormHidden: true
                        }, props.getParentState, props.renderParent, "del")
                    }}
                >
                    {UTIL_BTN.X}
                </span>
                <span 
                    className="Edit-Btn"
                    id={`${props.desc}-list-item-edit-${props.itemInfo.id}`}
                    title={`Edit ${props.desc}`}
                    onClick={(event) => {
                        addTodo(event, {
                            content: props.itemInfo.content,
                            checked: props.itemInfo.checked,
                            id: props.itemInfo.id,
                            editFormHidden: false
                        }, props.getParentState, 
                            props.renderParent, "edit");
                    }}
                >
                    {UTIL_BTN.PENCIL}
                </span>
            </span>
            {
                (props.desc === "task") ?
                <EditTaskForm 
                    itemInfo={props.itemInfo}
                    getSQLData={props.getSQLData}
                    updateSQLData={props.updateSQLData}
                /> :
                <EditBMForm 
                    itemInfo={props.itemInfo}
                    getSQLData={props.getSQLData}
                    updateSQLData={props.updateSQLData}            
                /> 
            }
        </li>
    );
}

export default ModalListItem;
