import React from 'react';
import '../App.css';
import AddNewTaskForm from './newtaskform';
import AddNewBMForm from './newbmform';
import UTIL_BTN from './constants/util-buttons';
import {toggleDisplay} from './helpers/modal-utils';

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
            }
        }
    */
    return (
        <div 
            className={props.getParentState().classModal} 
            id={`${props.desc}-modal`}
        >
            <div 
                className="Modal-Content" 
                id={`${props.desc}-modal-content`}
            >
                <div 
                    className="Modal-Content-Head" 
                    id={`${props.desc}-modal-content-head`}
                >
                    <span className="Modal-Title">{props.modalContentHead}</span>                    
                    <span 
                        className="Close-Btn" 
                        id={`${props.desc}-modal-content-close`}
                        onClick={() => {
                            props.renderParent({
                                modalListItems: props.getParentState().modalListItems,
                                sqlData: props.getParentState().sqlData,
                                classModal: "Modal" + toggleDisplay(
                                    props.getParentState().classModal === "Modal-Hidden"
                                )
                            });
                        }}
                        title="Close Modal"
                    >
                        {UTIL_BTN.X}
                    </span>
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
