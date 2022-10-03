import React, { useRef } from "react";
import "../../styles/modal-item-input.css";
import { addListItemData, toggleDisplay, formatURL, 
    alertRejectedInput, getAESFromUTF8Str } from '../../helpers';
import { MODAL_MODIFICATION_REQUEST, MAX_STR_LEN, 
    DELETED_STR, MODAL_DESC } from "../../constants";

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
                const newContentEncrypted = getAESFromUTF8Str(newContent);
                const newURL = formatURL(urlInputRef.current.value);
                const newURLEncrypted = getAESFromUTF8Str(newURL);
                
                if (newContentEncrypted.length <= MAX_STR_LEN.sql &&
                    newURLEncrypted.length <= MAX_STR_LEN.sql &&
                    newContent !== DELETED_STR &&
                    newContent.trim().length > 0 &&
                    newURL.trim().length > 0) {
                    addListItemData(
                        event, {
                            content: newContentEncrypted,
                            url: newURLEncrypted,
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
