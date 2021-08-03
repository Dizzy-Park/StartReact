import { ActionType, createAction, createReducer } from 'typesafe-actions'

export interface IGlobalReducer {
  loading: boolean
}

const initialState: IGlobalReducer = {
  loading: false
}

export const LOADING_ON = "loading/LOADING_ON"
export const LOADING_OFF = "loading/LOADING_OFF"

export const loadingOn = createAction(LOADING_ON)();
export const loadingOff = createAction(LOADING_OFF)();

export const actions = {loadingOn, loadingOff}
type GlobalReducerAction = ActionType<typeof actions>

// 리듀서 추가
const reducer = createReducer<IGlobalReducer, GlobalReducerAction>(initialState, {
  [LOADING_ON]: () => ({
    loading: true
  }), 
  [LOADING_OFF]: () => ({
    loading: false
  })
})

export default reducer