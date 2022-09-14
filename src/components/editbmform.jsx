import React from "react";
import '../App.css';
import { addBM, toggleDisplay } from './helpers/modal-utils';

function EditBMForm(props) {
    /*
        props = {
            itemInfo: {},
            getSQLData: function() {
                // do something
            },
            updateSQLData: function() {
                // do something
            },
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            }
        }
    */
   
    return (
        <form
            className={`Edit-Item-Form${toggleDisplay(!props.editFormHidden)}`}
            id={`edit-bm-list-item-${props.itemInfo.id}`}
            autoComplete="off"
            onSubmit={(event) => {
                addBM(event, props.itemInfo.id, 
                    props.getParentState, props.renderParent,
                    props.getSQLData, props.updateSQLData, 
                    `bm-label-editor-${props.itemInfo.id}`,
                    `bm-url-editor-${props.itemInfo.id}`
                );
            }}  
        >
            <input 
                type="text" className="Edit-Item-Form-Input"
                id={`bm-label-editor-${props.itemInfo.id}`} 
                placeholder="Label"
            />
            <input 
                type="text" className="Edit-Item-Form-Input"
                id={`bm-url-editor-${props.itemInfo.id}`} 
                placeholder="URL"
            />            
        </form>
    );
}

export default EditBMForm;