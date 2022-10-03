import $ from 'jquery';
import { getDeepCopy, formatStrMethod1 } from "../../helpers";
import { MAX_STR_LEN, UTIL_BTN } from '../../constants';

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
    const FI_VAL = getDeepCopy($(`#${mfState.idFI}`).val().toString());
    const focusForm = $(`#${mfState.idFF}`)[0];

    if (FI_VAL.trim().length !== 0) {
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
            showFocusText: formatStrMethod1(FI_VAL, MAX_STR_LEN.focus),
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

export { modifyFocus, focusDisplayCheckEvent, setFocus }