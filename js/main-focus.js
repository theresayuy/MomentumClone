/**
 * JS that allows user to set daily focus, edit daily focus, and tick it off
 */

// The form that accepts the daily
const focusForm = $("#focus-form")[0];
// Clear button thing to remove the current main focus when triggered
const focusDisplayClose = $("#show-focus-close")[0];
// Edit button thing to modify current focus when triggered
const focusDisplayEdit = $("#show-focus-edit")[0];
// Mark as Complete button thing that adds or removes strike through when triggered
const focusDisplayCheck = $("#show-focus-check")[0];
let MAX_STR_LEN1 = 50;
let EBB = "&#9744;"; // empty ballot box HTML unicode
let CBB = "&#9745;"; // checked ballot box HTML unicode
var savedFocus = [{"task":"", "checked":false}];

/**
 * Makes the form that asks for input invisible to the user.
 * Displays the input as text on the screen
 * The text is not crossed out
 */
function setFocus(event) {
    if (($("#focus").val()).trim() !== "") {
        $("#show-focus-text").css("text-decoration", "none");
        $(focusDisplayCheck).html(EBB);
        $(focusDisplayCheck).attr("title", "Check");
        
        if (($("#focus").val()).length >= MAX_STR_LEN1) {
            $("#show-focus-text").html(`${$("#focus").val().substring(0, MAX_STR_LEN1)}...`);
            savedFocus[0]["task"] = `${$("#focus").val().substring(0, MAX_STR_LEN1)}...`;
        } else {
            $("#show-focus-text").html($("#focus").val());
            savedFocus[0]["task"] = $("#focus").val();
        }
        savedFocus[0]["checked"] = false;
        window.localStorage.setItem("savedFocus", JSON.stringify(savedFocus));
        $(focusForm).fadeOut(1000);             
        $(focusForm).hide();      
        $("#main-focus-title").html("TODAY");
        $("#main-focus-title").css("font-size", "20px");
        $("#main-focus-title").css("font-weight", "bold");
        $("#show-focus").fadeIn(2000);        
        $("#show-focus").show();
    }

    event.preventDefault();
}

/**
 * Clears the content of the text on the screen 
 * and makes the form that asks for input visible to the user again.
 */
function modifyFocus() {
    $("#show-focus-text").html("");  
    $("#show-focus").hide();
    $("#main-focus-title").html("What is your main focus for today?")
    $("#main-focus-title").css("font-size", "24px");
    $("#main-focus-title").css("font-weight", "normal");        
    $(focusForm).fadeIn(1000);
    $(focusForm).show();
    window.localStorage.removeItem("savedFocus");        
}

focusForm.addEventListener("submit", setFocus, false);
focusDisplayClose.addEventListener("click", function() {
    $("#focus").val("");
    modifyFocus();
}, false);
focusDisplayEdit.addEventListener("click", function() {
    modifyFocus();
}, false);
focusDisplayCheck.addEventListener("click", function() {
   if (!savedFocus[0]["checked"]) {
        $("#show-focus-text").css("text-decoration", "line-through");
        $(focusDisplayCheck).html(CBB);
        $(focusDisplayCheck).attr("title", "Uncheck");
   } else {
        $("#show-focus-text").css("text-decoration", "none");
        $(focusDisplayCheck).html(EBB);
        $(focusDisplayCheck).attr("title", "Check");
   }

   savedFocus[0]["checked"] = !savedFocus[0]["checked"];
   window.localStorage.setItem("savedFocus", JSON.stringify(savedFocus));
}, false);
$("#show-focus").hide();

// load previously entered daily focus if it exists
if (window.localStorage.getItem("savedFocus")) {
    savedFocus = JSON.parse(window.localStorage.getItem("savedFocus"));
    $("#show-focus-text").html(savedFocus[0]["task"]);
    $("#focus").val(savedFocus[0]["task"]);

    if (savedFocus[0]["checked"]) {
        $("#show-focus-text").css("text-decoration", "line-through");
        $(focusDisplayCheck).html(CBB);
        $(focusDisplayCheck).attr("title", "Uncheck");
    } else {
        $("#show-focus-text").css("text-decoration", "none");
        $(focusDisplayCheck).html(EBB);
        $(focusDisplayCheck).attr("title", "Check");
    }

    $(focusForm).hide();
    $("#main-focus-title").html("TODAY");
    $("#main-focus-title").css("font-size", "20px");
    $("#main-focus-title").css("font-weight", "bold");
    $("#show-focus").show();
}