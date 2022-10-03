import { PICSUM_IDS } from "./constants";
import { getRandomValueFromArray } from "../../helpers";

function getRandomId() {
    return getRandomValueFromArray(PICSUM_IDS);
} // get random ID of an image stored on lorem picsum.

export {
    getRandomId
}