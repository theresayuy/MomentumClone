import React, { useRef } from "react";
import './style.css';
import { addListItemData, formatURL,
    alertRejectedInput } from "./helpers";
import { MODAL_MODIFICATION_REQUEST, MAX_STR_LEN, 
    DELETED_STR, MODAL_DESC } from "./constants";

function AddNewBMForm(props) {
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

    const urlInputRef = useRef(null);
    const contentInputRef = useRef(null);

    return (
        <form className="Modal-Form" 
            id={`${MODAL_DESC.bm}-modal-form`} 
            autoComplete="off"
            onSubmit={(event) => {
                const newContent = contentInputRef.current.value;
                const newURL = formatURL(urlInputRef.current.value);

                if (newContent.length <= MAX_STR_LEN.sql &&
                    newURL.length <= MAX_STR_LEN.sql &&
                    newContent !== DELETED_STR &&
                    newContent.trim().length > 0 &&
                    newURL.trim().length > 0) {
                    addListItemData(
                        event, {
                            id: props.getParentState().sqlData.length,
                            editFormHidden: true,
                            content: newContent,
                            url: newURL  
                        }, props.getParentState, props.renderParent, 
                        MODAL_MODIFICATION_REQUEST.new
                    );
                } else {
                    alertRejectedInput(event);
                }
            }}
        >
            <input type="text"
                className="Add-New-Item-Input"
                id={`${MODAL_DESC.bm}-input-new-label`}
                placeholder="New Label"
                ref={contentInputRef}
            />
            <input type="text"
                className="Add-New-Item-Input" 
                id={`${MODAL_DESC.bm}-input-new-url`}
                placeholder="New URL"
                ref={urlInputRef}
            />
            <input type="submit" hidden />
        </form>
    );
}

export default AddNewBMForm;