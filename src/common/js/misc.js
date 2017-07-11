// whether is empty object
export function isEmptyObject(obj) {
    for (let name in obj) {
        return false;
    }
    return true;
}