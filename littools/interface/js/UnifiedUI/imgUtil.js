
/**
 * Create a new image object
 * @param {String} src Location of the image
 */
export function createNewImg(src) {
    let obj = document.createElement("img")
    obj.src = src
    obj.className = "svgImg"
    return obj
}