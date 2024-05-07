export const ADMIN = "ADMIN";
export const NOTADMIN = "NOTADMIN";

export interface AdminAction {
  type: typeof ADMIN;
}

export interface NotAdminAction {
  type: typeof NOTADMIN;
}

export const adminAction = () => ({
  type: ADMIN,
});

export const notAdminAction = () => ({
  type: NOTADMIN,
});
