import {LOAD_STOCKS} from "../constants/stockActionType";

export default (state = [], action) => {
    switch (action.type) {
        case LOAD_STOCKS:
            return action.payload;
        default: return state;

    }
}