import {LOAD_CLIENTS} from "../constants/clientActionType";

export default (state = [], action) => {

    switch (action.type) {
        case LOAD_CLIENTS:
            return action.payload;
        default:
            return state;
    }

}