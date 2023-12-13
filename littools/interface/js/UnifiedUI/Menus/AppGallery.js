import { getUuid } from "../Random.js"

export class AppGalleryCard {
    /**
     * Create a new app card for the grid view
     * @param {String} parentID The ID of the parent Element
     * @param {String} id The ID that identify within the Grid View
     * @param {HTMLImageElement} icon The icon for this card
     * @param {String} title Title for this card
     * @param {Function} action What will the card do while onclick
     */
    constructor(parentID, id, icon=undefined, title, action=undefined) {
        // Create styes for the baseElement first
        this.elementID = `${getUuid()}-AppGalleryCard`
        this.id = id
        this.baseElement = document.createElement("div")
        this.baseElement.id = this.elementID
        this.baseElement.style.width = "105px"
        this.baseElement.style.height = "105px"
        this.baseElement.style.borderRadius = "5px"
        this.baseElement.style.backgroundColor = "rgba(0,0,0,0)"
        this.baseElement.style.display = "flex"
        this.baseElement.style.flexDirection = "column"
        this.baseElement.style.alignItems = "center"
        this.baseElement.style.justifyContent = "center"
        this.baseElement.style.cursor = "pointer"
        this.baseElement.style.transition = "all 0.1s"

        // Apply icons
        if (icon !== undefined) {
            icon.width = 50
            this.baseElement.appendChild(icon)
        }

        // Apply title element
        this.titleNode = document.createElement("div")
        this.titleNode.innerText = title
        this.titleNode.style.fontWeight = "bold"
        this.baseElement.appendChild(this.titleNode)

        // Apply hover styles
        this.baseElement.addEventListener("mouseover", ()=>{
            this.baseElement.style.backgroundColor = "rgba(255,255,255,0.15)"
        })
        this.baseElement.addEventListener("mouseout", ()=>{
            this.baseElement.style.backgroundColor = "rgba(0,0,0,0)"
        })

        // Apply onclick event
        this.baseElement.addEventListener("click", ()=>{
            action()
        })

        // Append to parent
        document.getElementById(parentID).appendChild(this.baseElement)
    }
}

export class AppGallery {

    constructor(columnWidth=115, parentID, maxHeight = "75vh") {
        this.elementID = `${getUuid()}-AppGallery`
        this.gridElements = []
        this.gridContainer = document.createElement("div")
        this.gridContainer.id = this.elementID
        this.gridContainer.style.flex = "1"
        this.gridContainer.style.overflowY = "scroll"
        this.gridContainer.style.display = "grid"
        this.gridContainer.style.gridTemplateColumns = `${columnWidth}px ${columnWidth}px ${columnWidth}px `
        this.gridContainer.style.rowGap = "10px"

        // modify the style of the parent ID so that to fit the screen
        let parentElement = document.getElementById(parentID)
        parentElement.style.display = "flex"
        parentElement.style.marginTop = "5px"
        parentElement.style.flex = "1"
        parentElement.style.flexDirection = "column"
        parentElement.style.alignItems = "center"
        parentElement.style.maxHeight = maxHeight
        

        // define the style of scroll bar here
        this.gridContainer.className = "beautifulScrollBar"
        document.getElementById(parentID).appendChild(this.gridContainer)
        // for (let i = 0; i < 50; i++) {
        //     let card = new AppGalleryCard(this.elementID, undefined, "Test", undefined)
        // }
    }

    /**
     * Create and append a new card into the view
     * @param {HTMLImageElement} icon The icon of the card
     * @param {String} title Title of the card
     * @param {String} id Unique ID that helps to identify objects for the grid class itself
     */
    appendElement(icon, title, id) {
        let card = new AppGalleryCard(this.elementID, id, icon, title, undefined)
        this.gridElements.push(card)
    }

}