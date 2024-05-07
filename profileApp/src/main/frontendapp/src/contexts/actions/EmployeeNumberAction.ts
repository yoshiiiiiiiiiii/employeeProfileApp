export const EMPLOYEE_NUMBER = "EMPLOYEE_NUMBER";

export interface EmployeeNumberAction {
  type: typeof EMPLOYEE_NUMBER;
  payload: number;
}

export const employeeNumberAction = (employeeNumber: number) => ({
  type: EMPLOYEE_NUMBER,
  payload: employeeNumber,
});
