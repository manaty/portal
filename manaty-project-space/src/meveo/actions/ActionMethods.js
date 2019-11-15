// Customer methods
export const GET_CURRENT_CUSTOMER = "GET_CURRENT_CUSTOMER";

export const EDIT_PASSWORD = "EDIT_PASSWORD";
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
