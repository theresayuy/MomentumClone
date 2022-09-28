import React, { useRef } from "react";
import './style.css';
import { addListItemData, toggleDisplay, 
    formatURL, alertRejectedInput } from './helpers';
import { MODAL_MODIFICATION_REQUEST, MAX_STR_LEN, 
    DELETED_STR, MODAL_DESC } from "./constants";

function EditBMForm(props) {
    /*
        props = {
            itemInfo: {},
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            }
        } 
    */

    const urlInputRef = useRef(null);
    const labelInputRef = useRef(null);
   
    return (
        <form
            className={`Edit-Item-Form${
                toggleDisplay(!props.itemInfo.editFormHidden)}`}
            id={`${MODAL_DESC.bm}-edit-list-item-${props.itemInfo.id}`}
            autoComplete="off"
            onSubmit={(event) => {
                const newContent = labelInputRef.current.value;
                const newURL = formatURL(urlInputRef.current.value);
                console.log(newContent + "\n" + newURL);
                
                if (newContent.length <= MAX_STR_LEN.sql &&
                    newURL.length <= MAX_STR_LEN.sql &&
                    newContent !== DELETED_STR &&
                    newContent.trim().length > 0 &&
                    newURL.trim().length > 0) {
                    addListItemData(
                        event, {
                            content: newContent,
                            url: newURL,
                            id: props.itemInfo.id,
                            editFormHidden: true
                        }, props.getParentState, props.renderParent, 
                        MODAL_MODIFICATION_REQUEST.edit
                    );
                } else {
                    alertRejectedInput(event);
                }
            }}  
        >
            <input 
                type="text" 
                className="Edit-Item-Form-Input"
                id={`${MODAL_DESC.bm}-label-editor-${props.itemInfo.id}`} 
                placeholder="Edit this Label"
                ref={labelInputRef}
            />
            <input 
                type="text" 
                className="Edit-Item-Form-Input"
                id={`${MODAL_DESC.bm}-url-editor-${props.itemInfo.id}`} 
                placeholder="Edit this URL"
                ref={urlInputRef}
            />
            <input type="submit" hidden/>            
        </form>
    );
}

export default EditBMForm;
