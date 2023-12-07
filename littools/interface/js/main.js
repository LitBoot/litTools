import {BasicButton} from "./UnifiedUI/Buttons/Button.js"
import {Segment, SimpleSegment} from "./UnifiedUI/Menus/Segments.js"
let closeButton = document.getElementById("closeBtn")

let counter = 0;

closeButton.onclick = () => {
    window.windowEvent.triggerOnClose("litTools:mainWindow")
    console.log("Event Triggered")
}

let naviSegment = new Segment([
    {
        "id": "plugins",
        "name": "Plugins",
        "objectID": "pluginList",
        "objectDisplay": "flex"
    },
    {
        "id": "scripts",
        "name": "Scripts",
        "objectID": "scriptList",
        "objectDisplay": "flex"
    },
    {
        "id": "others",
        "name": "Others",
        "objectID": "otherList",
        "objectDisplay": "flex"
    },
], "plugins", "pageWidth", "naviSegmentLoc")

let pluginListVSwitch = new SimpleSegment([
    {
        "id": "list",
        "name": "List",
    },
    {
        "id": "grid",
        "name": "Grid",
    }
], "list", "fitContent", "pluginOperationList")

let addNewPluginBtn = new BasicButton("Install Plugin", false, "normal", "pretty", "pluginOperationList")