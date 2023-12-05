import {BasicButton} from "./UnifiedUI/Buttons/Button.js"
let closeButton = document.getElementById("closeBtn")

closeButton.onclick = () => {
    window.windowEvent.triggerOnClose("litTools:mainWindow")
    console.log("Event Triggered")
}

let testButton = new BasicButton("This is a button", true, "Normal", "solid", "listView")
let test2Button = new BasicButton("This is another button", false, "Normal", "empty", "listView", () => { test2Button.modifyText("You clicked the button!") })

test2Button.onclick = ()=>{
    console.log("Clicked")
    test2Button.modifyText("You clicked the button!")
}