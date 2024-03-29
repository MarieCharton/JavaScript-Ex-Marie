
// Show popup to share score
function showPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // The popup is hidden by default 
    popupBackground.classList.add("active")
}

// Hide the popup
function hidePopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.remove("active")
}


// Initialize event listeners
function initAddEventListenerPopup() {
    // Listen click on button
    btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("click", () => {
        showPopup()
    })

    // Listen click on div "popupBackground"
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            hidePopup()
        }
    })
}