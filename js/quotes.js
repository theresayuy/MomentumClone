const MAX_STR_LEN3 = 100;
var i = Math.floor(Math.random() * 1643);

// Reads the external JSON file downloaded from https://type.fit/api/quotes
$.getJSON("js/quotes.json", function(quotes) {
    // selects a random quote less than 100 characters
    while (quotes[i]["text"].length > MAX_STR_LEN3) {
      i = Math.floor(Math.random() * 1643);
    }

    $("#text").html("\"" + quotes[i]["text"] + "\""); // Display the quote
    $("#author").html("- " + quotes[i]["author"]); // Display quote's author
    $("#author").hide(); // Don't initially show author's name
    $("#text")[0].addEventListener("mouseenter", function() {
      $("#author").slideDown(1000);
      $("#author").show();     
    }, false); // When you hover over quote, the author's name appears with a slide down animation
    $("#text")[0].addEventListener("mouseleave", function() {
      $("#author").slideUp(1000);
      $("author").hide();     
    }); // After hovering over quote, the author's name appears with a slide up animation
});