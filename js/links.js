var linksModal = $("#links-modal"); // the modal containing all the bookmarks
var openLinks = $("#links-btn"); // the button that opens the modal
var closeLinks = $("#links-close"); // the <span> element that closes the modal
var newBM = $("#new-link-btn"); // the button for adding a new bookmark
var submitBM = $("#new-bm-submit"); // the button for submitting a new bookmark
var newBMForm = $("#new-bm-form")[0]; // the form with the inputs for submitting a new bookmark
var savedBookmarks = [];

// Precondition: urlText is a string
// Postcondition: If urlText ends in a URL suffix but doesn't start with a protocol, then the https protocol is added. Otherwise, the urlText is returned. 
function formatURL(urlText) {
    const urlSuffixes = [".com", ".ca", ".gov", ".edu", ".net", ".org", ".mil", ".int", ".io", ".aero", ".af",
     ".me", ".app", ".bm", ".bo", ".bs", ".is", ".no"];
    for (var i = 0; i < urlSuffixes.length; i++) {
        if (urlText.includes(urlSuffixes[i]) && (!urlText.startsWith("https://") || !urlText.startsWith("http://"))) {
            return "https://" + urlText;
        }
    }
    return urlText;
}

// Precondition: num is a natural number.
// Postcondition: A new <li></li> is created and the URL and name of bookmark stored in savedBookmarks is added to the <li></li> with the icon
function addBMToUL(num) {
    const BMDEL = `<span class=\"close bm bm-item-${num}\" title=\"Delete\">&times;</span>`;
    const BMEDIT =`<span class=\"edit bm bm-item-${num}\" title=\"Edit\">&#9998;</span>`;
    const FAVICON = `<img src=\"http://s2.googleusercontent.com/s2/favicons?domain_url=${savedBookmarks[num]["URL"]}\" height=\"16\" width=\"16\"></img>`;
    const BMANCHOR = `<a href=\"${savedBookmarks[num]["URL"]}\">${savedBookmarks[num]["name"]}</a>`;
    $("#added-bm").html(`${$("#added-bm").html()}<li id=\"bm-item-${num}\">${FAVICON}${BMANCHOR}${BMDEL}${BMEDIT}</li>`);
}

function addBMListeners(num) {
    $(`.close.bm.bm-item-${num}`)[0].addEventListener("click", function() {
        $(`#bm-item-${num}`).remove();
        savedBookmarks[num]["removed"] = true;
        window.localStorage.setItem("savedBookmarks", JSON.stringify(savedBookmarks));
    }, false); // now you can delete the bookmark
    $(`.edit.bm.bm-item-${num}`)[0].addEventListener("click", function() {
        /*const EDITFORM = `<form autocomplete="off" class="edit-bm-form ${num}">
        <input type="text" class="bm-name ${num}" placeholder="Name" value="${savedBookmarks[num]["name"]}">
        <input type="text" id="bm-url ${num}" placeholder="URL" value="${savedBookmarks[num]["URL"]}">
        <button id="bm-submit ${num}">Submit</button></form>`;
        $("#links-modal-content-body").html(`${$("#links-modal-content-body").html()}${EDITFORM}`);
        $("#links-modal-content-head").hide();
        $("#added-bm").hide();

        $(`.edit-bm-form ${num}`)[0].addEventListener("click", function(event) {
            const nameInput = $(`.bm-name.${num}`);
            const urlInput = $(`.bm-url.${num}`);

            if (nameInput.val().trim() !== "" || urlInput.val().trim() !== "") {
                if (nameInput.val().trim() !== "") {
                    ("")
                    savedBookmarks[num]["name"] = nameInput.val();
                }

                if (urlInput.val().trim() !== "") {
                    savedBookmarks[num]["URL"] = urlInput.val();
                }

                windows.setItem("savedBookmarks", JSON.stringify(savedBookmarks));
            }

            $(`.edit-bm-form ${num}`).hide();
            $("#links-modal-content-head").fadeIn(200);
            $("#added-bm").fadeIn(200);     
            $("#links-modal-content-head").show();
            $("#added-bm").show();            
            $(`.edit-bm-form ${num}`).remove();
            event.preventDefault();
        }, false); */
    }, false);
}

/**
 * Function used by event listeners to add a new bookmark to the list of bookmarks
 */
function addBookmark(event) {
    var newName = "";
    var newURL = "#";

    if ($("#new-bm-name").val().trim() !== "" || $("#new-bm-url").val().trim() !== "") {
        if ($("#new-bm-name").val().trim() === "") {
            newName = $("#new-bm-url").val();
        } else {
            newName = $("#new-bm-name").val();
        }

        if ($("#new-bm-url").val().trim() !== "") {
            newURL = formatURL($("#new-bm-url").val());
        }

        savedBookmarks.push({"name":newName, "URL":newURL, "removed":false});
        window.localStorage.setItem("savedBookmarks", JSON.stringify(savedBookmarks));
        addBMToUL(savedBookmarks.length - 1);

        for (let i = 0; i < savedBookmarks.length; i++) {
            if (!savedBookmarks[i]["removed"]) {
                addBMListeners(i);
            }
        }
    }

    $("#new-bm-url").val("");
    $("#new-bm-name").val("");
    $(newBMForm).hide();
    $("#links-modal-content-head").fadeIn(200);
    $("#added-bm").fadeIn(200);     
    $("#links-modal-content-head").show();
    $("#added-bm").show();
    event.preventDefault();
}

openLinks[0].addEventListener("click", function() {
    linksModal.fadeIn(200);
    linksModal.show();
    $(newBMForm).hide(); // hide the form and inputs for entering a new bookmark
}, false); // now button opens the links modal
closeLinks[0].addEventListener("click", function() {
    linksModal.hide();
}, false); // now span element closes the links modal
newBM[0].addEventListener("click", function() {
    $("#links-modal-content-head").hide();
    $("#added-bm").hide();
    $(newBMForm).fadeIn(200);
    $(newBMForm).show();
}, false); // now button shows the form that allows you to enter a new bookmark
newBMForm.addEventListener("submit", addBookmark, false); // now submitting the form creates a new bookmark

// load previously entered bookmarks if they exist
if (window.localStorage.getItem("savedBookmarks")) {
    savedBookmarks = JSON.parse(window.localStorage.getItem("savedBookmarks"));
    var totalBookmarksPresent = 0;

    // count the number of bookmarks that haven't been removed yet
    for (let j = 0; j < savedBookmarks.length;j++) {
        if (!savedBookmarks[j]["removed"]) {
            totalBookmarksPresent += 1;
        }
    }

    if (totalBookmarksPresent === 0) {
        // helps with speed
        window.localStorage.removeItem("savedBookmarks");
        savedBookmarks = [];
    } else {
        for (let j = 0; j < savedBookmarks.length; j++) {
            if (!savedBookmarks[j]["removed"]) {
                addBMToUL(j); // display bookmarks that haven't been removed
            }
        }
    
        for (let i = 0; i < savedBookmarks.length; i++) {
            if (!savedBookmarks[i]["removed"]) {
                addBMListeners(i); // add listeners to the close and edit buttons 
            }
        }
    }
}