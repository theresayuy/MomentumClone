import React, { useRef } from "react";
import "../../styles/modal-item-input.css";
import { addListItemData, toggleDisplay, 
    alertRejectedInput, getAESFromUTF8Str } from '../../helpers';
import { MODAL_MODIFICATION_REQUEST, MAX_STR_LEN, 
    DELETED_STR, MODAL_DESC} from "../../constants";

function EditTaskForm(props) {
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

    const inputRef = useRef(null);
   
    return (
        <form
            className={`Edit-Item-Form${
                toggleDisplay(!props.itemInfo.editFormHidden)}`
            }
            id={`${MODAL_DESC.tasks}-edit-item-form-${props.itemInfo.id}`}
            autoComplete="off"
            onSubmit={(event) => {
                const newContent = inputRef.current.value;
                const newContentEncrypted = getAESFromUTF8Str(newContent);

                if (newContentEncrypted.length <= MAX_STR_LEN.sql && 
                    newContent !== DELETED_STR &&
                    newContent.trim().length > 0) {
                    addListItemData(event, {
                            content: newContentEncrypted,
                            checked: false,
                            id: props.itemInfo.id,
                            editFormHidden: true
                        }, 
                        props.getParentState, props.renderParent, 
                        MODAL_MODIFICATION_REQUEST.edit);
                } else {
                    alertRejectedInput(event);
                }
            }}  
        >
            <input 
                type="text" className="Edit-Item-Form-Input"
                id={`${MODAL_DESC.tasks}-editor-${props.itemInfo.id}`} 
                placeholder={`Edit this ${MODAL_DESC.tasks}`}
                ref={inputRef}
            />
        </form>
    );
}

export default EditTaskForm;