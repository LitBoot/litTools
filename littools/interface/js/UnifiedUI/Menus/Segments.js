import {mainColorGroup, mainBorderStyle} from "../Styles.js"
import {getUuid} from "../Random.js"

class SegmentButton {
    constructor(content, containerID) {
        this.baseElement = document.createElement("div")
        this.isActive = false;
        this.inactiveBG = `rgba(255,255,255,${mainColorGroup.transparentAlpha})`
        this.buttonID = `${getUuid()}-SegmentButton`

        this.baseElement.style.margin = `3px`
        this.baseElement.style.padding = `${mainBorderStyle.padding}px`
        this.baseElement.style.borderRadius = `${mainBorderStyle.borderRadius}px`
        this.baseElement.style.display = "flex"
        this.baseElement.style.flexDirection = "row"
        this.baseElement.style.justifyContent = "center"
        this.baseElement.style.alignItems = "center"
        this.baseElement.style.flex = "1"
        this.baseElement.style.transition = "all 0.1s"
        this.baseElement.style.userSelect = "none"
        this.baseElement.style.webkitUserSelect = "none"
        this.baseElement.style.cursor = "pointer"
        this.baseElement.id = this.buttonID
        // set this button to inactive style
        this.baseElement.style.backgroundColor = this.inactiveBG
        this.baseElement.style.color = "white"

        // set the hover style
        this.baseElement.addEventListener("mouseover", ()=>{
            if (this.isActive) {
                this.baseElement.style.backgroundColor = "rgba(255,255,255,0.85)"
            }
            else {
                this.baseElement.style.backgroundColor = `rgba(255,255,255,${mainColorGroup.transparentAlpha + 0.15})`
            }
        })

        this.baseElement.addEventListener("mouseout", ()=>{
            if (this.isActive) {
                this.baseElement.style.backgroundColor = "rgba(255,255,255,1)"
            }
            else {
                this.baseElement.style.backgroundColor = this.inactiveBG
            }
        })

        // append text
        this.baseTextElement = document.createTextNode(content)
        this.baseElement.appendChild(this.baseTextElement)
    }

    setActive() {
        this.baseElement.style.backgroundColor = "rgba(255,255,255,1)"
        this.baseElement.style.color = "rgba(0,0,0,1)"
        this.isActive = true;
        // console.log("Object set up active!" + this.buttonID)
    }

    setInactive() {
        this.baseElement.style.backgroundColor = this.inactiveBG
        this.baseElement.style.color = "white"
        this.isActive = false;
        // console.log("Object set up inactive!" + this.buttonID)
    }
}

export class Segment {

    /**
     * Create a segment using the information
     * @param {Array<{"objectID": String, "objectDisplay": String, "id": String, "name": String}>} content The list of items that will display in the segment control.
     * @param {String} defaultID The default selected ID for the segment control
     * @param {String} width Define the width of the segment control
     * @type {"fitContent" | "pageWidth"}
     * @param {StreamPipeOptions} parentID The ID name for the parent
     */
    constructor(content, defaultID, width, parentID) {
        this.objectDisplay = "flex"
        this.containerID = getUuid()
        this.currentID = null
        this.contents = content
        /**
         * @type {Array<SegmentButton>}
         */
        this.buttonObjectList = []

        // Defines the function that creates the back box of the segment
        this.segmentBackBox = document.createElement("div")
        this.segmentBackBox.id = this.containerID
        this.segmentBackBox.style.display = this.objectDisplay
        this.segmentBackBox.style.flexDirection = "row"
        this.segmentBackBox.style.backgroundColor = `rgba(255,255,255,${mainColorGroup.transparentAlpha})`
        this.segmentBackBox.style.margin = `${mainBorderStyle.margin}px`
        this.segmentBackBox.style.padding = `1px`
        this.segmentBackBox.style.borderRadius = `${mainBorderStyle.borderRadius}px`
        if (width === "fitContent") {
            this.segmentBackBox.style.width = "fit-content"
        }
        else {
            this.segmentBackBox.style.flex = "1"
        }

        // Put segment buttons into the segment container
        for (let i = 0; i < content.length; i++) {
            // create object
            let segmentBtn = new SegmentButton(content[i].name, this.containerID)

            // initializing control and styling
            if (content[i].id === defaultID) {
                // set the default value
                this.currentID = content[i].id
                segmentBtn.setActive()
                document.getElementById(content[i].objectID).style.display = content[i].objectDisplay
            }
            else {
                segmentBtn.setInactive()
                document.getElementById(content[i].objectID).style.display = "none"
            }

            // add event listeners
            segmentBtn.baseElement.addEventListener("click", (targetObjectID = segmentBtn.buttonID)=>{
                // set this element to active and others to inactive
                this.currentID = content[i].id
                for (let j = 0; j < content.length; j++) {
                    if (content[j].id === this.currentID) {
                        // set the default value
                        this.buttonObjectList[j].setActive()
                        document.getElementById(content[j].objectID).style.display = content[j].objectDisplay
                    }
                    else {
                        this.buttonObjectList[j].setInactive()
                        document.getElementById(content[j].objectID).style.display = "none"
                    }
                }
                
            })

            // push the button into the list
            this.buttonObjectList.push(segmentBtn)
            // append the element
            this.segmentBackBox.appendChild(segmentBtn.baseElement)
            document.getElementById(parentID).appendChild(this.segmentBackBox)
        }
        
    }

    /**Refresh the whole list */
    refreshList() {
        for (let i = 0; i < this.contents.length; i++) {
            // create object
            let segmentBtn = new SegmentButton(this.contents[i].name, this.containerID)

            // initializing control and styling
            if (this.contents[i].id === defaultID) {
                // set the default value
                this.currentID = this.contents[i].id
                segmentBtn.setActive()
                document.getElementById(this.contents[i].objectID).style.display = this.contents[i].objectDisplay
            }
            else {
                segmentBtn.setInactive()
                document.getElementById(this.contents[i].objectID).style.display = "none"
            }

            // add event listeners
            segmentBtn.baseElement.addEventListener("click", () => {
                // set this element to active and others to inactive
                this.currentID = this.contents[i].id
                for (let j = 0; j < this.contents.length; j++) {
                    if (this.contents[j].id === this.contents[i].id) {
                        // set the default value
                        this.currentID = this.contents[j].id
                        segmentBtn.setActive()
                        document.getElementById(this.contents[j].objectID).style.display = this.contents[j].objectDisplay
                    }
                    else {
                        segmentBtn.setInactive()
                        document.getElementById(this.contents[j].objectID).style.display = "none"
                    }
                }

            })

            // append the element
            this.segmentBackBox.appendChild(segmentBtn)
            document.getElementById(parentID).appendChild(this.segmentBackBox)
        }
    }

    /**
     * Append a new element into the list and refresh the whole view
     * @param {{"objectID": Number, "objectDisplay": String, "id": String, "name": String}} element The target append element
     */
    appendElement(element) {
        this.contents.push(element)
        this.refreshList()
    }
}