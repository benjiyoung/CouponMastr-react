import UserModel from "../Models/UserModel";

export class AuthState{
    public user:UserModel = null;
    public isLogged:boolean = false;
}

export enum AuthActionType{
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
}

export interface AuthAction{
    type:AuthActionType,
    payload?: any
}

export function loginAction(user:UserModel):AuthAction{
    return {type:AuthActionType.Login, payload:user}
}
export function logoutAction():AuthAction{
    return {type: AuthActionType.Logout}
}

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction):AuthState{
    const newState = {...currentState};
    switch(action.type){
        case AuthActionType.Login:
            localStorage.removeItem("user");
            newState.user = action.payload;
            localStorage.setItem("user",JSON.stringify(newState.user));
            newState.isLogged = true;
            break;
        case AuthActionType.Logout:
            newState.user = null;
            localStorage.removeItem("user");
            newState.isLogged = false;
            break;
    }
    return newState;
}

// import { ClientType } from "../Models/ClientTypeModel";
// import CredentialsModel from "../Models/CredentialModel";
// import UserModel from "../Models/UserModel";

// export class AuthState {
//     public user: UserModel
//     public isLogged: boolean = false
//     public currentMenu: ClientType = ClientType.GUEST
// }

// //auth action types
// export enum AuthActionType {
//     Login = "Login",
//     Logout = "Logout",
//     isLogged = "isLogged",
//     currentMenu = "currentMenu"
// }

// //auth action
// export interface AuthAction {
//     type: AuthActionType,
//     payload?: any
// }

// export function loginAction(user: CredentialsModel): AuthAction {
//     return { type: AuthActionType.Login, payload: user }
// }

// export function logoutAction(): AuthAction {
//     return { type: AuthActionType.Logout }
// }

// export function isLoggedAction(isLogged: boolean): AuthAction {
//     return { type: AuthActionType.isLogged, payload: isLogged }
// }

// export function currentMenuAction(currentMenu: ClientType): AuthAction {
//     return { type: AuthActionType.currentMenu, payload: currentMenu }
// }

// //auth reducer
// export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
//     const newState = { ...currentState };
//     switch (action.type) {
//         case AuthActionType.Login:
//             newState.user = action.payload;
//             localStorage.removeItem("user");
//             localStorage.setItem("user", JSON.stringify(newState.user));
//             break;
//         case AuthActionType.Logout:
//             newState.user = null;
//             localStorage.removeItem("user");
//             break;
//         case AuthActionType.isLogged:
//             newState.isLogged = action.payload;
//             break;
//         case AuthActionType.currentMenu:
//             newState.currentMenu = action.payload;
//             break;
//     }
//     return newState;
// }