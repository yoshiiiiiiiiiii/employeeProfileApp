import {
  EMPLOYEE_NUMBER,
  EmployeeNumberAction,
} from "../actions/EmployeeNumberAction";

import { EMPLOYEE_ID, EmployeeIdAction } from "../actions/EmployeeIdAction";

interface EmployeeState {
  employeeNumber: number;
  employeeId: string;
}

const initialState: EmployeeState = {
  employeeNumber: 0,
  employeeId: "",
};

export const EmployeeStatusReducer = (
  state = initialState,
  action: EmployeeNumberAction | EmployeeIdAction
): EmployeeState => {
  switch (action.type) {
    case EMPLOYEE_NUMBER:
      return {
        ...state,
        employeeNumber: action.payload,
      };
    case EMPLOYEE_ID:
      return {
        ...state,
        employeeId: action.payload,
      };
    default:
      return state;
  }
};
