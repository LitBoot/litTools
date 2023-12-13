
/**
 * Create a new image object
 * @param {String} src Location of the image
 * @param {Number} width The width of the image
 * @returns {HTMLImageElement} Returns the html image object for further using
 */
export function createNewImg(src, width=null) {
    let obj = document.createElement("img")
    obj.src = src
    if (width !== null) {
        obj.width = width
    }
    return obj
}