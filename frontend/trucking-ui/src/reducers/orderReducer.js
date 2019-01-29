import {SET_ORDERS} from "../constants/orderActionType";

export default (state = [], action) => {

    switch (action.type) {
        case SET_ORDERS:
            return action.payload;
        default:
            return state;
    }

}