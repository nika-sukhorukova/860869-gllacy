var linkSearch = document.querySelector(".search-button");
var popupSearch = document.querySelector(".search-form");
var closeSearch = document.querySelector(".js-close-modal");

linkSearch.addEventListener("click", function (evt) {
    linkSearch.classList.add("nav-search-mouseover");
    popupSearch.classList.add("modal-show");
    closeSearch.style.display = "block";
});

closeSearch.addEventListener("click", function (evt) {
    this.style.display = "none";
    popupSearch.classList.remove("modal-show");
    linkSearch.classList.remove("nav-search-mouseover");
});

var linkEntrance = document.querySelector(".js-entrance-button");
var popupEntrance = document.querySelector(".modal-form");
var closeEntrance = document.querySelector(".js-close-modal");

linkEntrance.addEventListener("click", function (evt) {
    evt.preventDefault();
    closeEntrance.style.display = "block";
    linkEntrance.classList.add("user-entrance-mouseover");
    popupEntrance.classList.add("modal-show");
});

closeEntrance.addEventListener("click", function (evt) {
    this.style.display = "none";
    popupEntrance.classList.remove("modal-show");
    linkEntrance.classList.remove("user-entrance-mouseover");
});

var button = document.querySelector(".feedback");
var popup = document.querySelector(".feedback-modal");
var closeOverlay = document.querySelector(".js-feedback-overlay");
var closeModalButton = popup.querySelector(".js-modal-close");

button.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    closeOverlay.style.display = "block";
});

closeModalButton.addEventListener("click", function (evt) {
    popup.classList.remove("modal-show");
    closeOverlay.style.display = "none";
});

closeOverlay.addEventListener("click", function (evt) {
    this.style.display = "none";
    popup.classList.remove("modal-show");
});




