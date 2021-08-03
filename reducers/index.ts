import { AnyAction, combineReducers } from 'redux'
import testReducer, { TestReducer } from "./testReducer";
import globalReducer, { IGlobalReducer } from './GlobalReducer'
import userReducer, { IUserReducer } from "./userReducer";
import { HYDRATE } from "next-redux-wrapper";

export interface State {
  testReducer: TestReducer;
  globalReducer: IGlobalReducer;
  userReducer: IUserReducer
}

const rootReducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        testReducer, 
        globalReducer, 
        userReducer
      })

      return combineReducer(state, action);
    }
  }
}

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>;