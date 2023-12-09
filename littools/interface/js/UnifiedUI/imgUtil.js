
/**
 * Create a new image object
 * @param {String} src Location of the image
 */
export function createNewImg(src, width=null) {
    let obj = document.createElement("img")
    obj.src = src
    if (width !== null) {
        obj.width = width
    }
    return obj
}