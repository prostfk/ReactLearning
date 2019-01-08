import {LOAD_AUTOS} from "../constants/autoActionType";

export default (state = [], action) => {

    switch (action.type) {

        case LOAD_AUTOS:
            return action.payload;
        default:
            return state;

    }

}