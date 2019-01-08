import {LOAD_ORDERS} from "../constants/orderActionType";

export default (state = [], action) => {

    switch (action.type) {

        case LOAD_ORDERS:
            return action.payload;
        default:
            return state;

    }

}