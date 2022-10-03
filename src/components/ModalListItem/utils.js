import { getAESFromUTF8Str } from "../../helpers";
import { MODAL_DESC } from "../../constants";

function getNewItemInfo(desc, newItemInfo, oldItemInfo) {
    /*
        newItemInfo = {
            editFormHidden: true,
            content: "..."
            // has url or checked field
        }

        desc = "link" || "task"

        oldItemInfo = {
            editFormHidden: true,
            content: "...",
            id: 0,
            // has url or checked field           
        }
    */
        
    const data = {
        content: getAESFromUTF8Str(newItemInfo.content), 
        id: oldItemInfo.id,
        editFormHidden: newItemInfo.editFormHidden
    };
    const extraKey = (desc === MODAL_DESC.tasks) ? "checked" : "url";
    data[extraKey] = (extraKey === "url") ? 
        getAESFromUTF8Str(oldItemInfo[extraKey]) : oldItemInfo[extraKey];
    return data;
} /* tries to distinguish bookmarks from tasks and returns a js 
        object with the fields from newItemInfo, and with the
        id and either the url or checked fields from 
        oldItemInfo (depends on whether its a bookmark or a task)
*/

export { getNewItemInfo }