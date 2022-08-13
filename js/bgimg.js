/** 
 * Sets the background image to an image generated from the picsum photos API
 * Adds translucent overlay to deal with white text against white background image issue
 */
$("#bg").css("background-image", `url(https://picsum.photos/${$(window).width()}/${$(window).height()})`);
$(".overlay").css("background-color", "rgba(0, 0, 0, 0.4)");
$(".overlay").css("height", "100%");
$(".overlay").css("width", "100%");
$(".overlay").css("top", 0);
$(".overlay").css("left", 0);