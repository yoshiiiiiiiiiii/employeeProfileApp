import {
  ADMIN,
  NOTADMIN,
  AdminAction,
  NotAdminAction,
} from "../actions/AdminAction";

interface AdminState {
  isAdmin: number;
}

const initialState: AdminState = {
  isAdmin: 0,
};

export const AdminReducer = (
  state = initialState,
  action: AdminAction | NotAdminAction
): AdminState => {
  switch (action.type) {
    case ADMIN:
      return {
        ...state,
        isAdmin: 1,
      };
    case NOTADMIN:
      return {
        ...state,
        isAdmin: 0,
      };

    default:
      return state;
  }
};
