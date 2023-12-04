
let closeButton = document.getElementById("closeBtn")

closeButton.onclick = () => {
    window.windowEvent.triggerOnClose("litTools:mainWindow")
    console.log("Event Triggered")
}