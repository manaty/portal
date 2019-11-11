// Customer methods
export const GET_CURRENT_CUSTOMER = "GET_CURRENT_CUSTOMER";
export const LOGIN_USER = "LOGIN_USER";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const SIGNUP_CUSTOMER = "SIGNUP_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const LOGOUT_CURRENT_CUSTOMER = "LOGOUT_CURRENT_CUSTOMER"
export const UPDATE_USER = "UPDATE_USER";

// Data methods
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_STATUSES = "GET_STATUSES";

// user methods
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const EDIT_PROFILE_USER = "EDIT_PROFILE_USER";
export const GET_PROFILE_USERS = "GET_PROFILE_USERS";
export const GET_ATTACHABLE_USERS_KEYSET = "GET_ATTACHABLE_USERS_KEYSET";
export const EDIT_SKILLS_USER = "EDIT_SKILLS_USER";
export const EDIT_PROJECTS_USER = "EDIT_PROJECTS_USER";
export const EDIT_AVAILABILITY_USER = "EDIT_AVAILABILITY_USER";
export const EDIT_BIO_USER = "EDIT_BIO_USER";
export const DOWNLOAD_IMAGE_FILE = "DOWNLOAD_IMAGE_FILE";
export const UPLOAD_IMAGE_FILE = "UPLOAD_IMAGE_FILE";
export const DOWNLOAD_CV_FILE = "DOWNLOAD_CV_FILE";
export const UPLOAD_CV_FILE = "UPLOAD_CV_FILE";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_PROJECT = "GET_ALL_PROJECT";
export const GET_PROJECT_DETAILS = "GET_PROJECT_DETAILS";
export const EDIT_CLIENT_PROJECT = "EDIT_CLIENT_PROJECT";
export const EDIT_ASSEMBLA_PROJECT = "EDIT_ASSEMBLA_PROJECT";
export const UPLOAD_IMAGE_PROJECT_FILE = "UPLOAD_IMAGE_PROJECT_FILE";
export const EDIT_TEAMS_PROJECT = "EDIT_TEAMS_PROJECT";
export const ADD_PROJECT_FOR_USER = "ADD_PROJECT_FOR_USER";
export const EDIT_IMAGE_USER = "EDIT_IMAGE_USER";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const EDIT_EDUCATIONS_USER = "EDIT_EDUCATIONS_USER";
export const EDIT_COURSES_USER = "EDIT_COURSES_USER";
export const EDIT_MISSION_USER = "EDIT_MISSION_USER";
export const REMOVE_MISSION = "REMOVE_MISSION";
export const GENERATE_CV = "GENERATE_CV";
export const GENERATE_CV_EXPORT = "GENERATE_CV_EXPORT";
export const GET_PROJECT_SPACE = "GET_PROJECT_SPACE";


export function startMethod(actionMethod) {
	return actionMethod + '_START';
}

export function successMethod(actionMethod) {
	return actionMethod + '_SUCCESS';
}

export function errorMethod(actionMethod) {
	return actionMethod + '_ERROR';
}
