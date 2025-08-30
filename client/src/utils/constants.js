export const API_ENDPOINTS = {
  LOGIN: "/v1/api/auth",
  CUSTOMER_SIGNUP: "/v1/api/customers",
  INSPECTOR_SIGNUP: "/v1/api/inspector",
  COMPANY_SIGNUP: "/v1/api/company",
  USER_PROFILE: "/v1/api/auth/me",
};

export const USER_ROLES = {
  CUSTOMER: "customer",
  INSPECTOR: "inspector",
  COMPANY: "company",
  ADMIN: "admin",
};

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  CUSTOMER_SIGNUP: "/signup/customer",
  INSPECTOR_SIGNUP: "/signup/inspector",
  COMPANY_SIGNUP: "/signup/company",
  CUSTOMER_DASHBOARD: "/dashboard/customer",
  INSPECTOR_DASHBOARD: "/dashboard/inspector",
  COMPANY_DASHBOARD: "/dashboard/company",
  UNAUTHORIZED: "/unauthorized",
};
