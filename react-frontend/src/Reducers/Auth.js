import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    SERVER_DOWN,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED,
    MICROSOFT_AUTHENTICATED_SUCCESS,
    MICROSOFT_AUTHENTICATED_FAILED,
    GOOGLE_AUTHENTICATED_SUCCESS,
    GOOGLE_AUTHENTICATED_FAILED,
    LOGOUT,
    SERVER_UP
} from '../Actions/Types'

const initalState = {
    server_down : false,
    access : localStorage.getItem('access'),
    refresh : localStorage.getItem('refresh'),
    isAuthenticated: null,
    user : null    
}

export default function (state=initalState, action) {
    const { type, payload } = action

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access: payload.access,
                refresh: payload.refresh,
                isAuthenticated: true,

            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case MICROSOFT_AUTHENTICATED_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access: payload.access,
                refresh: payload.refresh,
                isAuthenticated: true,
            }     
        case GOOGLE_AUTHENTICATED_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access: payload.access,
                refresh: payload.refresh,
                isAuthenticated: true,
            }     
        case AUTHENTICATED_FAILED:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
            }
        case LOGIN_FAILED:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
            }
        case MICROSOFT_AUTHENTICATED_FAILED:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
            }
        case GOOGLE_AUTHENTICATED_FAILED:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
            }
        case USER_LOADED_FAILED:
            return{
                ...state,
                user: null
            }
        case SERVER_DOWN:
            return{
                ...state,
                server_down: true
            }
        case SERVER_UP:
            return{
                ...state,
                server_down: false
            }
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case PASSWORD_RESET_SUCCESS :
        case PASSWORD_RESET_FAILED :
        case PASSWORD_RESET_CONFIRM_SUCCESS :
        case PASSWORD_RESET_CONFIRM_FAILED :
            return {
                ...state
            }
        default:
            return state
    }
}