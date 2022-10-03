import React, { useRef } from "react";
import "../../styles/modal-item-input.css";
import { addListItemData, alertRejectedInput,
    getAESFromUTF8Str } from "../../helpers";
import { MODAL_MODIFICATION_REQUEST, MAX_STR_LEN, 
    DELETED_STR, MODAL_DESC } from "../../constants";

function AddNewTaskForm(props) {
    /*
        props = {
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            }
        }
    */

    const inputRef = useRef(null);
        
    return (
        <form className="Modal-Form"
            id={`${MODAL_DESC.tasks}-modal-form`}
            autoComplete="off"
            onSubmit={(event) => {
                const newContent = inputRef.current.value
                const newContentEncrypted = getAESFromUTF8Str(newContent);
                if (newContentEncrypted.length <= MAX_STR_LEN.sql
                    && newContent !== DELETED_STR &&
                    newContent.trim().length > 0) {
                    addListItemData(event, {
                            content: newContentEncrypted,
                            checked: false,
                            id: props.getParentState().modalListItems.length,
                            editFormHidden: true
                        },
                        props.getParentState, props.renderParent, 
                        MODAL_MODIFICATION_REQUEST.new
                    );
                } else {
                    alertRejectedInput(event);
                }
            }}
        >
            <input type="text"
                className="Add-New-Item-Input" 
                id={`${MODAL_DESC.tasks}-add-new-item-input`}
                placeholder={`Add a new ${MODAL_DESC.tasks}`}
                ref={inputRef}
            />
        </form>
    );
}

export default AddNewTaskForm;