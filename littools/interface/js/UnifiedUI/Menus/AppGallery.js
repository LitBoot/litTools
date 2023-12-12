import { getUuid } from "../Random.js"

export class AppGalleryCard {
    constructor(parentID) {
        this.elementID = `${getUuid()}-AppGalleryCard`
        this.baseElement = document.createElement("div")
        this.baseElement.id = this.elementID
        this.baseElement.style.width = "105px"
        this.baseElement.style.height = "105px"
        this.baseElement.style.borderRadius = "5px"
        this.baseElement.style.backgroundColor = "dodgerblue"
        document.getElementById(parentID).appendChild(this.baseElement)
    }
}

export class AppGallery {

    constructor(columnWidth=115, parentID, maxHeight = "75vh") {
        this.elementID = `${getUuid()}-AppGallery`
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
        for (let i = 0; i < 50; i++) {
            let card = new AppGalleryCard(this.elementID)
        }
    }

}