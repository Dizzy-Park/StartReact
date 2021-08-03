import { createAction, ActionType, createReducer } from 'typesafe-actions'

export interface TestReducer {
  text: string;
}

const initialState: TestReducer = {
  text: "hello"
}

export const RESET_TEXT = "testReducer/RESET_TEXT"
export const ADD_TEXT = "testReducer/ADD_TEXT"
export const REMOVE_TEXT = "testReducer/REMOVE_TEXT"

export const resetText = createAction(RESET_TEXT)();
export const addText = createAction(ADD_TEXT)<TestReducer>();
export const removeText = createAction(REMOVE_TEXT)();

export const actions = {resetText, addText, removeText}
type TestReducerActions = ActionType<typeof actions>;

const testReducer = createReducer<TestReducer, TestReducerActions>(initialState, {
  [RESET_TEXT]: () => ({
    text: ""
  }),
  [ADD_TEXT]: (state, action) => {
    return ({
      ...state,
      text: action.payload.text
    })
  },
  [REMOVE_TEXT]: (state) => ({
    text: ""
  })
})

export default testReducer;