import React from 'react';
import '../App.css';
import {toggleDisplay} from './helpers/modal-utils';

function ModalButton(props) {
    /*
        props = {
            desc: "...",
            renderParent: function() {
                // do something
            },
            getParentState: function() {
                // do something
            }
        }
    */

    return (
        <button className='Modal-Button'
            id={`${props.desc}-modal-btn`}
            onClick={() => {
                props.renderParent({
                    modalListItems: props.getParentState().modalListItems,
                    sqlData: props.getParentState().sqlData,
                    classModal: "Modal" + toggleDisplay(
                        props.getParentState().classModal === "Modal-Hidden"
                    )
                }, props.getParentState().sqlData.length - 1);
            }}
        >
            {
                `${
                    props.desc.slice(0, 1).toUpperCase()
                }${
                    props.desc.slice(1)
                }s`
            }
        </button>
    );
}

export default ModalButton;