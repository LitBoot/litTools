import {mainColorGroup, mainBorderStyle} from "../Styles.js"
import {hexToRgb} from "../ColorConverter.js"

export class BasicButton {
    /**
     * Create a button using the information
     * @param {String} content Content that exists in the button
     * @param {Boolean} isDanger Whether display the button in danger mode
     * @param {String} size Indicate the size of the button
     * @type {"normal" | "big" | "small"}
     * @param {String} style Indicate the style of the button. Solid or Empty.
     * @type {"solid" | "empty"}
     * @param {String} parentID The ID name for the parent
     * @param {Function} onClickHandler The function the button will do when on click.
     */
    constructor(content, isDanger, size="normal", style, parentID) {
        this.baseElement = document.createElement("div")
        this.baseTextElement = document.createTextNode(content)
        // define basic styles of a button
        let text = ""
        this.baseElement.style.display = "flex"
        this.baseElement.style.flexDirection = "row"
        this.baseElement.style.alignItems = "center"
        this.baseElement.style.justifyContent = "center"
        this.baseElement.style.margin = mainBorderStyle.margin + "px",
        this.baseElement.style.cursor = "pointer"
        this.baseElement.style.borderRadius = mainBorderStyle.borderRadius + "px"
        this.baseElement.style.transition = "all 0.1s"
        this.baseElement.style.userSelect = "none"
        this.baseElement.style.webkitUserSelect = "none"

        // Apply different size
        if (size === "normal") {
            this.baseElement.style.padding = mainBorderStyle.padding + "px"
        }
        else if (size === "small") {
            this.baseElement.style.padding = mainBorderStyle.padding - 2 + "px"
            this.baseElement.style.fontSize = "12px"
        }
        else if (size === "big") {
            this.baseElement.style.padding = mainBorderStyle.padding + 2 + "px"
        }
        else {
            this.baseElement.style.padding = mainBorderStyle.padding + "px"
        }

        // Apply dangerous color
        let mainColor = undefined
        if (isDanger) {
            mainColor = mainColorGroup.red
        }
        else {
            mainColor = mainColorGroup.blue
        }

        // Apply different styles
        let mainColorInRGB = hexToRgb(mainColor)
        let coverMeshColorEmpty = "rgba("+mainColorInRGB.r+","+mainColorInRGB.g+","+mainColorInRGB.b+","+mainColorGroup.transparentAlpha+")"
        let coverMeshColorSolid = "rgba(" + mainColorInRGB.r - 40 + "," + mainColorInRGB.g - 40 + "," + mainColorInRGB.b - 40 + ", 1)"
        if (style === "empty") {
            this.baseElement.style.borderStyle = "solid"
            this.baseElement.style.borderWidth = "1px"
            this.baseElement.style.backgroundColor = "rgba(0,0,0,0)"
            this.baseElement.style.borderColor = mainColor                   
            this.baseElement.style.color = mainColor
        }
        else {
            this.baseElement.style.backgroundColor = mainColor
            this.baseElement.style.color = "white"
        }
        this.baseElement.appendChild(this.baseTextElement)

        // Apply different hover style
        this.baseElement.addEventListener("mouseover", ()=>{
            if (style === "empty") {
                this.baseElement.style.backgroundColor = coverMeshColorEmpty
            }
            else {
                this.baseElement.style.backgroundColor = coverMeshColorSolid
            }
        })
        this.baseElement.addEventListener("mouseout", ()=>{
            if (style === "empty") {
                this.baseElement.style.backgroundColor = "rgba(0,0,0,0)"
            }
            else {
                this.baseElement.style.backgroundColor = mainColor
            }
        })

        // add to the page
        document.getElementById(parentID).appendChild(this.baseElement)
    }

    modifyText(text) {
        this.baseElement.innerText = text
    }
}