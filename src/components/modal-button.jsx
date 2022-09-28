import React from 'react';
import './style.css';
import { toggleDisplay } from './helpers';

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
                props.renderParent("Modal" + toggleDisplay(
                    props.getParentState() === "Modal-Hidden"
                ))
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