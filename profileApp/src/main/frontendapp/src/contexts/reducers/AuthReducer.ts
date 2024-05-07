import {
  LOGIN,
  LOGOUT,
  LoginAction,
  LogoutAction,
} from "../actions/LoginAction";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const AuthReducer = (
  state = initialState,
  action: LoginAction | LogoutAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
