import {BasicButton} from "./UnifiedUI/Buttons/Button.js"
let closeButton = document.getElementById("closeBtn")

let counter = 0;

closeButton.onclick = () => {
    window.windowEvent.triggerOnClose("litTools:mainWindow")
    console.log("Event Triggered")
}

let testButton = new BasicButton("This is a button", true, "Normal", "solid", "listView")
let test2Button = new BasicButton("This is another button", false, "small", "solid", "listView")

test2Button.baseElement.onclick = ()=>{
    counter++
    test2Button.modifyText(counter)
}