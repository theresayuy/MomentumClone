import React, { useState } from 'react';

import './style.css';
import { focusDisplayCheckEvent, modifyFocus,
    setFocus } from './utils';

import { getAESFromUTF8Str,
    getUTF8StrFromAES } from '../../helpers';
import { UTIL_BTN } from '../../constants';
import { useLocalStorage } from "../../hooks";

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
        showFocusText: (storedFocus.focusText !== "") ? 
            getUTF8StrFromAES(storedFocus.focusText) : "",
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
        <div id="main-focus" className="Main-Focus">
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
                autoComplete="off"
                style={mfState.cssFF} 
                onSubmit={(event) => {
                    setFocus(event, mfState, (oldMFState, vals) => {
                        setStoredFocus({
                            focusText: getAESFromUTF8Str(vals.showFocusText),
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
                                focusText: getAESFromUTF8Str(oldMFState.showFocusText),
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
                <span 
                    id={mfState.idSFT}
                    style={mfState.cssSFT}
                >
                    {mfState.showFocusText}
                </span>
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
