import { getMin, getMax } from '../../helpers';

import { MY_WIN_DIM } from "./constants";

function getNewTopAdd(props, starState, winH) {
    // change direction if star reaches the very top or bottom
    if (getMax(0, getMin(winH, 
        props.top + starState.topChange * props.initialYDir
    )) === 0) {
        return props.initialYDir * (1 / MY_WIN_DIM.H) * winH;
    } else if (getMax(0, getMin(winH, 
        props.top + starState.topChange * props.initialYDir
    )) === winH) {
        return props.initialYDir * -1 * (1 / MY_WIN_DIM.H) * winH;
    }

    return starState.topAdd; // star can keep travelling in same direction
}

export { getNewTopAdd };
