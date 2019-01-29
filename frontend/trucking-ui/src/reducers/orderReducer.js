import {SET_ORDERS} from "../constants/orderActionType";
import {LOAD_ORDERS} from "../constants/orderActionType";

export default (state = [], action) => {

    switch (action.type) {
        case SET_ORDERS:
            return action.payload;
        case LOAD_ORDERS:
            return action.payload;
        default:
            return state;
    }

}