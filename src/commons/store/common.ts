import {
  AsyncThunk,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { useAbsAlert } from "../popup/store/absPopupHook";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { ICommonsStore } from "commons";
import { IRes } from "commons/Http";

export type ExtraArg<T> = { store: () => T };
export type AsyncThunkConfig<RootState extends ICommonsStore, T = unknown> = {
  state: RootState;
  extra: ExtraArg<RootState>;
  rejectValue: T;
};

/**
 *
 * @param type
 * @param thunk
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createThunk = <
  RootState extends ICommonsStore,
  Returned,
  ThunkArg = undefined
>(
  type: string,
  thunk: AsyncThunkPayloadCreator<
    IRes<Returned>,
    ThunkArg,
    AsyncThunkConfig<RootState>
  >
): AsyncThunk<IRes<Returned>, ThunkArg, AsyncThunkConfig<RootState>> => {
  return createAsyncThunk<
    IRes<Returned>,
    ThunkArg,
    AsyncThunkConfig<RootState>
  >(type, async (arg, thunkAPI) => {
    try {
      return await thunk(arg, thunkAPI);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // console.log("createAppThunk", err);
      return thunkAPI.rejectWithValue(err.message);
    }
  });
};

export const useAbsApi = <State extends ICommonsStore>(
  buttonComponent?: React.FC,
  width?: number | string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { alert } = useAbsAlert(buttonComponent, width);
  // const navigates = useNavigate();
  const apiResult = async <Returned, ThunkArg>(
    thunk: AsyncThunk<IRes<Returned>, ThunkArg, AsyncThunkConfig<State>>,
    param?: ThunkArg,
    errorCallback?: () => void
  ): Promise<IRes<Returned> | undefined> => {
    const res = await dispatch(thunk(param as ThunkArg));
    if (thunk.fulfilled.match(res)) {
      switch (statePayloadCode(res.payload.code)) {
        case "success":
        case "success-none":
          return res.payload as IRes<Returned>;
        case "fail":
          alert(
            res.payload.message.replace("ErrorInValidParamException:", ""),
            errorCallback
          );
          return { ...res.payload, content: undefined } as IRes<Returned>;
        case "error":
        default:
          alert(
            "문제있음 >> " +
              res.payload.apiLink +
              " <br/> " +
              res.payload.message,
            errorCallback
          );
          return { ...res.payload, content: undefined } as IRes<Returned>;
      }
    } else if (thunk.rejected.match(res)) {
      alert("통신실패<br/>" + res.type, errorCallback);
      console.log("api thunk error", res);
      throw new Error(res.error.message);
    }
  };
  return apiResult;
};

export function useSelectorEq<STATE, T>(fn: (state: STATE) => T): T {
  return useSelector(fn, shallowEqual);
}

export function isPayloadCode(code: number) {
  switch (code) {
    case 200:
    case 201:
    case 204:
      return true;
    case 400:
    case 404:
    case 405:
    case 409:
    case 460:
    case 500:
    default:
      return false;
  }
}

export function statePayloadCode(code: number) {
  switch (code) {
    case 200:
    case 201:
      return "success";
    case 204:
      return "success-none";
    case 400:
    case 404:
    case 405:
    case 409:
    case 460:
    case 500:
      return "fail";
    default:
      return "error";
  }
}

export function returnRes<T = undefined>(data?: T) {
  return { code: 200, message: "", content: data } as IRes<T>;
}
