import React from 'react';

import './style.css';

import AddNewTaskForm from "../NewTaskForm"
import AddNewBMForm from "../NewBMForm";
import { toggleDisplay } from "../../helpers";
import { UTIL_BTN } from "../../constants";

function Modal(props) {
    /*
        props = {
            desc: "...", 
            modalContentHead: "...",
            getParentState: function() {
                // do something
            },
            renderParent: function() {
                // do something
            },
            getParentIsOpen: function() {
                // do something
            },
            setParentIsOpen: function() {
                // do something
            }
        }
    */
    return (
        <div 
            className={props.getParentIsOpen()} 
            id={`${props.desc}-modal`}
            title="NOTE: This feature is broken for the demo website."
        >
            <div 
                className="Modal-Content" 
                id={`${props.desc}-modal-content`}
            >
                <div 
                    className="Modal-Content-Head" 
                    id={`${props.desc}-modal-content-head`}
                >
                    <p className="Modal-Title">{props.modalContentHead}</p>                    
                    <p 
                        className="Close-Btn" 
                        id={`${props.desc}-modal-content-close`}
                        onClick={() => {
                            props.setParentIsOpen("Modal" + toggleDisplay(
                                    props.getParentIsOpen() === "Modal-Hidden"
                                )
                            );
                        }}
                        title="Close Modal"
                    >
                        {UTIL_BTN.X}
                    </p>
                </div>
                <div
                    className="Modal-Add-New-Form"
                    id={`${props.desc}-modal-add-new-form`}
                >
                    {
                        (props.desc === "task") ? 
                        <AddNewTaskForm 
                            getParentState={props.getParentState} 
                            renderParent={props.renderParent}
                        /> :
                        <AddNewBMForm 
                            getParentState={props.getParentState}
                            renderParent={props.renderParent}
                        />
                    }
                </div>
                <div 
                    className="Modal-Content-Body"
                    id={`${props.desc}-modal-content-body`}
                >
                    <ul id={`${props.desc}-modal-ul`}>
                        {props.getParentState().modalListItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Modal;
