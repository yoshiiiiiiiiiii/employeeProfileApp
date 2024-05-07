export const EMPLOYEE_ID = "EMPLOYEE_ID";

export interface EmployeeIdAction {
  type: typeof EMPLOYEE_ID;
  payload: string;
}

export const employeeIdAction = (employeeId: string) => ({
  type: EMPLOYEE_ID,
  payload: employeeId,
});
