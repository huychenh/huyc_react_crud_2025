export const BASE_API_URL = "https://dummyjson.com";
export const GET_USERS_API_URL = `${BASE_API_URL}/users`;
export const ADD_USER_API_URL = `${BASE_API_URL}/users/add`;
export const DELETE_USER_API_URL = (userId: number | string) => `${BASE_API_URL}/users/${userId}`;
export const GET_USER_API_URL = (userId: number | string) => `${BASE_API_URL}/users/${userId}`;
export const PATCH_USER_API_URL = (userId: number | string) => `${BASE_API_URL}/users/${userId}`;
export const UPDATE_USER_API_URL = (userId: number | string) => `${BASE_API_URL}/users/${userId}`;




