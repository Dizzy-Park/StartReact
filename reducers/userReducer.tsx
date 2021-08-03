import { ActionType, createAction, createReducer } from "typesafe-actions";

export interface IUserInfo {
  id: number;
  name: string;
}

export interface IUserReducer {
  accessToken: string;
  userInfo: IUserInfo;
}

const initialState: IUserReducer = {
  accessToken: "", 
  userInfo: {id: 0, name: ""}
}

export const SET_TOKEN = "user/SET_TOKEN"
export const SET_USER_INFO = "user/SET_USER_INFO"
export const LOGOUT = "user/LOGOUT"

export const setToken = createAction(SET_TOKEN)<IUserReducer>();
export const setUserInfo = createAction(SET_USER_INFO)<IUserReducer>();
export const logout = createAction(LOGOUT)<IUserReducer>();

export const actions = {setToken, setUserInfo, logout}
type UserReducerAction = ActionType<typeof actions>

const reducer = createReducer<IUserReducer, UserReducerAction>(initialState, {
  [SET_TOKEN]: (state, action) => {
    return ({
      ...state, 
      accessToken: action.payload.accessToken
    })
  }, 
  [SET_USER_INFO]: (state, action) => {
    const payload = (action.payload as any);
    return ({
      ...state, 
      userInfo: payload
    })
  }, 
  [LOGOUT]: (state) => {
    return ({
      ...state, 
      accessToken: "", 
      userInfo: {id: 0, name: "", teamName: "", adminYn: false}
    })
  }
})

export default reducer