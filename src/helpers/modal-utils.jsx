import React from "react";
import ModalListItem from "../components/ModalListItem";
import { DELETED_STR, MODAL_MODIFICATION_REQUEST } 
    from '../constants';
import { getDeepCopy, getAESFromUTF8Str } from "./str-arr-utils";

function getListItemsBeforeMount(description, getParentState, renderParent, sqlData) {
    const result = [];
    
    for (let i = 0; i < sqlData.length; i++) {
        if (sqlData[i].content !== DELETED_STR) {
            result.push(<ModalListItem
                key={`${i}`}
                desc={description} 
                itemInfo={sqlData[i]}
                getParentState={getParentState}
                renderParent={renderParent}
            />);
        } else {
            result.push(
                <li 
                    className="Deleted-List-Item"
                    key={`${i}`}
                ></li>
            );
        }
    }

    return getDeepCopy(result);
} /* get array of ModalListItems representing each item stored in sql db 
before the component mounts.
*/

function toggleCheck(event, itemInfo, getState, renderTodoList) {
    addListItemData(event, {
            content: getAESFromUTF8Str(itemInfo.content),
            checked: !itemInfo.checked,
            id: itemInfo.id,
            editFormHidden: true
        }, getState, renderTodoList, MODAL_MODIFICATION_REQUEST.edit);
} // checks off unchecked tasks and unchecks checked tasks

function addListItemData(event, newItemInfo, getItems, setItems, request) {                   
    const storedTodos = getDeepCopy(getItems().sqlData);
    
    if (newItemInfo.id <= storedTodos.length) {
        if (request === MODAL_MODIFICATION_REQUEST.new) {
            storedTodos.push(newItemInfo);
        } else  {
            storedTodos[newItemInfo.id] = newItemInfo;
        }

        setItems({
            modalListItems: getItems().modalListItems,
            sqlData: storedTodos
        }, newItemInfo.id, request);        
    }
    event.preventDefault();
} // Add task as a ModalListItem to Modal and update sql db

function formatURL(url) {
    if (url.trim().length > 0) {
        const parts = url.split("/");
        const scheme = parts[0];
        let result = "";

        if (scheme !== "https:" && scheme !== "http:") {
            result += ((scheme.indexOf("localhost") === 0) ? "" : "https://") + scheme;
        } else {
            result += "https://"
        }

        if (parts.length > 1) {
            for (let i = 2; i < parts.length; i++) {
                result += `${parts[i]}/`;
            }
        }

        return getDeepCopy(result);
    }

    return url;
} // returns a URL that starts with https

function toggleDisplay(isHidden) {
    return (isHidden) ? "" : "-Hidden"
} /* allows the CSS display property for different elements 
of the modal to be set to none or initial
*/

function alertRejectedInput(event) {
    event.preventDefault();
    window.alert("Your input was rejected.");
}

export { getListItemsBeforeMount, addListItemData, toggleCheck, 
    toggleDisplay, formatURL, alertRejectedInput };