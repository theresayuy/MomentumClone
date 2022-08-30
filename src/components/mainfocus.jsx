/**
 * Responsible for the form that lets the user insert the main task
 * they want to focus on.
 * I DID IT...
 */

import React from 'react';
import '../App.css';
import $ from 'jquery';
import { getDeepCopy } from './helpers/str-arr-stuff';

// inner HTML for check boxes
const EBB = "&#9744;"; // empty ballot box HTML unicode
const CBB = "&#9745;"; // checked ballot box HTML unicode

// IDs and classes of HTML elements
const PROPS = {
    idMFT: "main-focus-title", // main focus title paragraph
    idSFT: "show-focus-text", // show focus text paragraph
    idFI: "focus", // focus form input element
    idFF: "focus-form", // focus form 
    idGM: "greeting", // greeting message
    idCB: "show-focus-check", // id for the checkbox span
    idSF: "show-focus", // id for show focus div
    classCB: "cb" // class for the checkbox span
}

const MAX_STR_LEN = 50; 

class MainFocus extends React.Component {
    constructor() {
        super();
        this.state = {
            mainFocusTitle: "What is your main focus for today?",
            showFocusCheck: EBB,
            showFocusText: "",
            showFocusTitle: "Check",
            focusInputVal: ""
        }
    }

    render() {
        return (
            <div id="main-focus">
                <div id={PROPS.idGM}>Greetings!</div>
                <p id={PROPS.idMFT}>{this.state.mainFocusTitle}</p>
                <form id={PROPS.idFF} autocomplete="off">
                    <input type="text" id={PROPS.idFI} val={this.state.focusInputVal}/>
                </form>
                <div id={PROPS.idSF}>
                    <span className={PROPS.classCB} id={PROPS.idCB} title={this.state.showFocusTitle}>{this.state.showFocusCheck}</span>
                    <span className="close" id="show-focus-close" title="Clear">&times;</span>
                    <span className="edit" id="show-focus-edit" title="Edit">&#9998;</span>
                    <p id={PROPS.idSFT}>{this.state.showFocusText}</p>
                </div>
            </div>
        );
    }

    /**
     * Clears the content of the text on the screen 
     * and makes the form that asks for input visible to the user again.
     */
     modifyFocus() {
        const focusForm = $(`#${PROPS.idFF}`)[0];
        
        this.setState((_) => {
            $(`#${PROPS.idSF}`).hide();
            $(`#${PROPS.idMFT}`).css("font-size", "24px");
            $(`#${PROPS.idMFT}`).css("font-weight", "normal");
            $(focusForm).fadeIn(1000);
            $(focusForm).show();
            
            return {
                showFocusText: "",
                mainFocusTitle: "What is your main focus for today?"
            };
        });
    }

    /**
     * Makes the form that asks for input invisible to the user.
     * Displays the input as text on the screen
     * The text is not crossed out
     */
    setFocus(event) {
        const FI_VAL = getDeepCopy($(`#${PROPS.idFI}`).val());

        if (FI_VAL.trim() !== "") {
            this.setState((_) => {
                const focusText = (FI_VAL.length >= MAX_STR_LEN) ? 
                                `${FI_VAL.substring(0, MAX_STR_LEN)}...` : FI_VAL;
                $(`#${PROPS.idSFT}`).css("text-decoration", "none");

                return {
                    showFocusCheck: EBB,
                    showFocusTitle: "Check",
                    showFocusText: getDeepCopy(focusText)
                };
            });
        }

        this.setState((_) => {
            const focusForm = $(`#${PROPS.idFF}`)[0];

            $(`#${PROPS.idMFT}`).css("font-size", "20px");
            $(`#${PROPS.idMFT}`).css("font-weight", "bold");
            $(`#${PROPS.idSF}`).fadeIn(2000);        
            $(`#${PROPS.idSF}`).show();
            $(focusForm).fadeOut(1000);             
            $(focusForm).hide(); 
            return {mainFocusTitle: "TODAY"};
        });

        event.preventDefault();
    }

    // resets main focus when the current main focus is closed
    focusDisplayCloseEvent() {
        this.setState((_) => {
            return {focusInputVal: ""};
        });
        this.modifyFocus();
    }

    // Strikethrough the main focus if checked. Undo the strikethrough otherwise.
    focusDisplayCheckEvent() {
        
    }
}

export default MainFocus;