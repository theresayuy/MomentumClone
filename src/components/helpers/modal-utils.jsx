import React from "react";
import $ from 'jquery';
import ModalListItem from "../modallistitem";
import DELETED_STR from '../constants/listitem-del';
import { getDeepCopy } from "./str-arr-utils";

function getListItemsBeforeMount(description, getParentState, renderParent, sqlData) {
    const result = [];
    
    for (let i = 0; i < sqlData.length; i++) {
        if (sqlData[i].content !== DELETED_STR) {
            result.push(<ModalListItem
                desc={description} 
                itemInfo={sqlData[i]}
                getParentState={getParentState}
                renderParent={renderParent}
            />);
        } else {
            result.push(<li className="Deleted-List-Item"></li>);
        }
    }

    return getDeepCopy(result);
} /* get array of ModalListItems representing each item stored in sql db 
before the component mounts.
*/

function toggleCheck(event, itemInfo, getState, renderTodoList) {
    addTodo(event, {
            content: getDeepCopy(itemInfo.content),
            checked: !itemInfo.checked,
            id: itemInfo.id,
            editFormHidden: true
        }, getState, renderTodoList, "new");
} // checks off unchecked tasks and unchecks checked tasks

function addTodo(event, newItemInfo, getState, renderTodoList, request) {
    const listItems = getDeepCopy(getState().modalListItems);                    
    const storedTodos = getDeepCopy(getState().sqlData);
    
    if (listItems.length === storedTodos.length && 
        newItemInfo.id <= listItems.length) {
        const NEW_ITEM_TODO = (request === "del") ? 
        (<li 
            className="Deleted-List-Item"
        >
        </li>) : 
        (<ModalListItem 
            desc="task"
            itemInfo={newItemInfo}
            getParentState={getState}
            renderParent={renderTodoList}
        />);

        if (newItemInfo.id === listItems.length) {
            storedTodos.push(newItemInfo);
            listItems.push(NEW_ITEM_TODO);
        } else  {
            storedTodos[newItemInfo.id] = newItemInfo;
            listItems[newItemInfo.id] = NEW_ITEM_TODO;
        }

        renderTodoList({
            modalListItems: listItems,
            sqlData: storedTodos,
            classModal: getState().classModal
        }, newItemInfo.id);        
    }
    event.preventDefault();
} // Add task as a ModalListItem to Modal and update sql db

function formatURL(url) {
    const parts = url.split("/");
    const scheme = parts[0];
    let result = "";

    if (scheme !== "https:" && scheme !== "http:") {
        result += ((scheme.indexOf("localhost") === 0) ? "" : "https://") + scheme;
    } else {
        result += "https://"
    }

    if (parts.length > 1) {
        for (let i = 1; i < parts.length; i++) {
            result += `${parts[i]}/`;
        }
    }

    return getDeepCopy(result);
} // returns a URL that starts off with https

function addBM(event, index, getBMState, renderBM, getStoredBMs, updateStoredBMs, 
    inputBMLabelID, inputBM_URL_ID) // Smell: Too many parameters. Refactor into smaller functions.
{
    const listItems = getDeepCopy(getBMState().modalListItems);
    const storageItems = getDeepCopy(getStoredBMs());
    const label = $(`#${inputBM_URL_ID}`).val();
    const url = $(`#${inputBMLabelID}`).val();

    if (listItems.length === storageItems.length) {
        const NEW_STORED_ITEM = {
            id: index,
            content: getDeepCopy(label),
            url: formatURL(url)
        };
        const NEW_LIST_ITEM = (<ModalListItem 
            desc="link"
            itemInfo={NEW_STORED_ITEM}
            getParentState={getBMState}
            renderParent={renderBM}
            getSQLData={getStoredBMs}
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

function toggleDisplay(isHidden) {
    return (isHidden) ? "" : "-Hidden"
} /* allows the CSS display property for different elements 
of the modal to be set to none or initial
*/

export { getListItemsBeforeMount, addTodo, toggleCheck, addBM, toggleDisplay };