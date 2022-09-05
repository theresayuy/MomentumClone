/**
 * Responsible for the form that lets the user insert the main task
 * they want to focus on.
 */
import React, {useState} from 'react';
import '../App.css';
import $ from 'jquery';
import { getDeepCopy } from './helpers/str-arr-utils';
import useLocalStorage from './helpers/local-storage';
import UTIL_BTN from './constants/util-buttons';

const MAX_STR_LEN = 75;

function formatFocusText(textToFormat) {
    let result = "";
    const MAX_LOOPS = Math.floor(textToFormat.length / MAX_STR_LEN);

    if (MAX_LOOPS === 0) {
        return getDeepCopy(textToFormat);
    } else {
        for (let i = 0; i < MAX_LOOPS; i++) {
            result += `${textToFormat.slice(
                    i * MAX_STR_LEN, (i + 1) * MAX_STR_LEN
                )}\n` ;
        }

        return `${result}${textToFormat.slice(MAX_LOOPS * MAX_STR_LEN)}`;
    }
}

// lets user change their main focus
function modifyFocus(mfState, renderMF) {
    const focusForm = $(`#${mfState.idFF}`)[0];

    $(`#${mfState.idSF}`).hide();
    $(`#${mfState.idCB}`).hide();
    $(`#show-focus-edit`).hide();
    $(focusForm).fadeIn(1000);
    $(focusForm).show();
    renderMF(mfState, {
        cssMFT:{
            fontSize: "36px",
            fontWeight: "normal"
        },
        showFocusText: "",
        mainFocusTitle:"What is your main focus for today?"
    });
}

// displays any user input as the main focus
function setFocus(event, mfState, renderMF) {
    const FI_VAL = getDeepCopy($(`#${mfState.idFI}`).val());
    const focusForm = $(`#${mfState.idFF}`)[0];

    if (FI_VAL.trim().length !== 0) {
        const focusText = formatFocusText(FI_VAL);
        $(`#${mfState.idSF}`).fadeIn(2000);        
        $(`#${mfState.idSF}`).show();
        $(focusForm).fadeOut(1000);             
        $(focusForm).hide();
        $(`#${mfState.idCB}`).show();
        $(`#show-focus-edit`).show();
        renderMF(mfState, {
            mainFocusTitle: "Today",
            idSF: "show-focus",
            showFocusCheck: UTIL_BTN.EBB,
            showFocusCheckTitle: "Check",
            showFocusText: getDeepCopy(focusText),
            cssSFT: {
                textDecoration: "none",
                fontSize: "36px"
            },
            cssMFT: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        });
    }
    event.preventDefault();
}

// strikethroughs the main focus when completed
function focusDisplayCheckEvent(mfState, renderMF) {
    if ($(`#${mfState.idCB}`).html() === UTIL_BTN.CBB) {
        renderMF(mfState, {
            cssSFT: {
                textDecoration: "none",
                fontSize: "36px"
            },
            showFocusCheck: UTIL_BTN.EBB,
            showFocusCheckTitle: "Check"
        });
    } else {
        renderMF(mfState, {
            cssSFT: {
                textDecoration: "line-through",
                fontSize: "36px"
            },
            showFocusCheck: UTIL_BTN.CBB,
            showFocusCheckTitle: "Uncheck"
        });
    }
}

function MainFocus() {
    const [storedFocus, setStoredFocus] = useLocalStorage("mainFocus", {
        focusText: "",
        checked: false 
    });
    const [mfState, renderMF] = useState({
        mainFocusTitle: (storedFocus.focusText === "") ? 
                        "What is your main focus for today?" : "Today",
        showFocusCheck: (storedFocus.checked) ? UTIL_BTN.CBB : 
                        UTIL_BTN.EBB, // checkbox utility button
        showFocusText: storedFocus.focusText,
        showFocusCheckTitle: ((storedFocus.checked) ? "Unc" : "C") + "heck",
        idMFT: "main-focus-title", // main focus title paragraph id
        idSFT: "show-focus-text", // show focus text paragraph id
        idFI: "focus", // focus form input element id
        idFF: "focus-form", // focus form id
        idGM: "greeting", // greeting message id
        idCB: "show-focus-check", // id for the checkbox span
        idSF: `show-focus${
            (storedFocus.focusText === "") ? `-0` : ``
        }`, // id for show focus div
        cssMFT: {
            fontSize: (storedFocus.focusText === "") ? "36px" : "20px",
            fontWeight: (storedFocus.focusText === "") ? "normal" : "bold",
        }, // CSS for the main focus title
        cssSFT: {
            textDecoration: (storedFocus.checked) ? "line-through" : "none",
            fontSize: "36px"
        }, // CSS for the show focus text
        cssFF: {
            display: (storedFocus.focusText === "") ? "initial" : "none"
        } // CSS for focus form
    });

    return (
        <div id="main-focus" className="Main-Focus-0">
            <div id={mfState.idGM}>Hello!</div>
            <br></br>
            <div 
                id={mfState.idMFT}
                style={mfState.cssMFT}
            >
                {mfState.mainFocusTitle}
            </div>
            <form 
                id={mfState.idFF} 
                autocomplete="off"
                style={mfState.cssFF} 
                onSubmit={(event) => {
                    setFocus(event, mfState, (oldMFState, vals) => {
                        setStoredFocus({
                            focusText: vals.showFocusText,
                            checked: false
                        });
                        renderMF({
                            mainFocusTitle: vals.mainFocusTitle,
                            showFocusCheck: vals.showFocusCheck,
                            showFocusText: vals.showFocusText,
                            showFocusCheckTitle: vals.showFocusCheckTitle,
                            idMFT: oldMFState.idMFT, 
                            idSFT: oldMFState.idSFT, 
                            idFI: oldMFState.idFI, 
                            idFF: oldMFState.idFF, 
                            idGM: oldMFState.idGM, 
                            idCB: oldMFState.idCB, 
                            idSF: vals.idSF, 
                            cssMFT: vals.cssMFT, 
                            cssSFT: vals.cssSFT, 
                            cssFF: oldMFState.cssFF          
                        });                        
                    });
                }}
            >
                <input type="text" id={mfState.idFI}/>
            </form>
            <div id={mfState.idSF}>
                <span className="CB-Btn"
                    id={mfState.idCB} 
                    title={mfState.showFocusCheckTitle} 
                    onClick={() => {
                        focusDisplayCheckEvent(mfState, (oldMFState, vals) => {
                            setStoredFocus({
                                focusText: oldMFState.showFocusText,
                                checked: (vals.showFocusCheck === UTIL_BTN.CBB)
                            });
                            renderMF({
                                mainFocusTitle: oldMFState.mainFocusTitle,
                                showFocusCheck: vals.showFocusCheck,
                                showFocusText: oldMFState.showFocusText,
                                showFocusCheckTitle: vals.showFocusCheckTitle,
                                idMFT: oldMFState.idMFT, 
                                idSFT: oldMFState.idSFT, 
                                idFI: oldMFState.idFI, 
                                idFF: oldMFState.idFF, 
                                idGM: oldMFState.idGM, 
                                idCB: oldMFState.idCB, 
                                idSF: oldMFState.idSF, 
                                cssMFT: oldMFState.cssMFT, 
                                cssSFT: vals.cssSFT, 
                                cssFF: oldMFState.cssFF          
                            });                        
                        });
                    }}
                >
                    {mfState.showFocusCheck}
                </span>
                <span className="TabSpan">{"\u0009"}</span>
                <span 
                    id={mfState.idSFT}
                    style={mfState.cssSFT}
                >
                    {mfState.showFocusText}
                </span>
                <span className="TabSpan">{"\u0009"}</span>
                <span 
                    className="Edit-Btn" 
                    id="show-focus-edit" 
                    title="Edit" 
                    onClick={() => {
                        modifyFocus(mfState, (oldMFState, vals) => {
                            setStoredFocus({
                                focusText: vals.showFocusText,
                                checked: false
                            });
                            renderMF({
                                mainFocusTitle: vals.mainFocusTitle,
                                showFocusCheck: oldMFState.showFocusCheck,
                                showFocusText: vals.showFocusText,
                                showFocusCheckTitle: oldMFState.showFocusCheckTitle,
                                idMFT: oldMFState.idMFT, 
                                idSFT: oldMFState.idSFT, 
                                idFI: oldMFState.idFI, 
                                idFF: oldMFState.idFF, 
                                idGM: oldMFState.idGM, 
                                idCB: oldMFState.idCB, 
                                idSF: oldMFState.idSF, 
                                cssMFT: vals.cssMFT, 
                                cssSFT: oldMFState.cssSFT, 
                                cssFF: oldMFState.cssFF          
                            });                        
                        });
                    }}
                >
                    {UTIL_BTN.PENCIL}
                </span>
            </div>
        </div>
    );
}

export default MainFocus;
