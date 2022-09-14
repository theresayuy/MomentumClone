import React from "react";
import '../App.css';
import { addBM } from './helpers/modal-utils';

function AddNewBMForm(props) {
    /*
        props = {
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
        <form className="Modal-Form" id={`bm-modal-form`} 
            autoComplete="off"
            onSubmit={(event) => {
                if (props.desc === "task") {
                    addBM(event, props.getSQLData().length,
                        props.getParentState, props.renderParent,
                        props.updateSQLData, props.getSQLData, `input-new-bm-label`,
                        `input-new-bm-url`
                    );
                }
            }}
        >
            <input type="text"
                className='Add-New-Item-Input' id={`input-new-bm-label`} 
                placeholder={`Label`}
            />
            <input type="text"
                className='Add-New-Item-Input' id={`input-new-bm-url`} 
                placeholder={`URL`}
            />
        </form>
    );
}

export default AddNewBMForm;