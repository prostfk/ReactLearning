import {AUTH_SUCCESS, LOGOUT} from "../constants/userActionType";

export default (state = [], action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return [
                {
                    userRole: action.payload[0],
                    token: action.payload[1],
                    userId: action.payload[2],
                    companyId: action.payload[3]
                }, ...state
            ];
        case LOGOUT:
            return [];
    }
}