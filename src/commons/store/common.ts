import {
  createAsyncThunk,
  type AsyncThunkPayloadCreator,
  type AsyncThunk,
  type AnyAction,
  type CombinedState,
  configureStore,
} from "@reduxjs/toolkit";
import type { AbsIRes } from "../Http";
import { useAbsAlert } from "../popup/store/absPopupHook";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import type { ICommonsStore } from "..";
import { getLoadingMiddleware } from "commons/loading/store/loadingR";

export type ExtraArg<T> = { store: () => T };
export type AbsAsyncThunkConfig<
  RootState extends ICommonsStore,
  T = unknown,
> = {
  state: RootState;
  // extra: ExtraArg<RootState>;
  rejectValue: T;
};

/**
 * 각 프로젝트 대응을 위해 RES 리턴을 상속 구현으로 변경처리
 * AbsAsyncThunkConfig 또한 상속 구현으로 변경
 * @param type
 * @param thunk
 * @returns
 */
export const absCreateThunk = <
  RootState extends ICommonsStore,
  Res extends AbsIRes<Returned>,
  Returned,
  ThunkArg = undefined,
>(
  type: string,
  thunk: AsyncThunkPayloadCreator<Res, ThunkArg, AbsAsyncThunkConfig<RootState>>
): AsyncThunk<Res, ThunkArg, AbsAsyncThunkConfig<RootState>> => {
  return createAsyncThunk<Res, ThunkArg, AbsAsyncThunkConfig<RootState>>(
    type,
    async (arg, thunkAPI) => {
      try {
        return (await thunk(arg, thunkAPI)) as Res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // console.log("createAppThunk", err);
        return await thunkAPI.rejectWithValue(err.message);
      }
    }
  );
};
/**
 * 각 프로젝트 대응을 위해 RES 리턴을 상속 구현으로 변경처리
 * @param type
 * @param thunk
 * @returns
 */
export const absCreatePageThunk = <
  RootState extends ICommonsStore,
  Res extends AbsIRes<Returned, Pagelable>,
  Returned,
  ThunkArg = undefined,
  Pagelable = undefined,
>(
  type: string,
  thunk: AsyncThunkPayloadCreator<Res, ThunkArg, AbsAsyncThunkConfig<RootState>>
): AsyncThunk<Res, ThunkArg, AbsAsyncThunkConfig<RootState>> => {
  return createAsyncThunk<Res, ThunkArg, AbsAsyncThunkConfig<RootState>>(
    type,
    async (arg, thunkAPI) => {
      try {
        return (await thunk(arg, thunkAPI)) as Res;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // console.log("createAppThunk", err);
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  );
};

export type ApiResultErrorCallBack = () => void;
export type ApiBaseErrorCallBack = () => void;

export const useAbsApi = <State extends ICommonsStore>(
  buttonComponent?: React.FC,
  width?: number | string,
  inStatePayloadCode?: (code: number) => StatePayloadCodeType,
  baseEror?: ApiBaseErrorCallBack
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { alert } = useAbsAlert(buttonComponent, width);
  // const navigates = useNavigate();
  const apiResult = async <
    Res extends AbsIRes<Returned, Pageable>,
    Returned,
    Pageable,
    ThunkArg,
  >(
    thunk: AsyncThunk<Res, ThunkArg, AbsAsyncThunkConfig<State>>,
    param?: ThunkArg,
    errorCallback?: ApiResultErrorCallBack
  ): Promise<Res | undefined> => {
    const res = await dispatch(thunk(param as ThunkArg));
    if (thunk.fulfilled.match(res)) {
      const pcode = inStatePayloadCode ? inStatePayloadCode : statePayloadCode;
      switch (pcode(res.payload.code)) {
        case "success":
        case "success-none":
          return res.payload as Res;
        case "fail":
          if (errorCallback) {
            errorCallback();
          } else {
            alert(
              res.payload.message.replace("ErrorInValidParamException:", "")
            );
          }
          return { ...res.payload, content: undefined } as Res;
        case "error":
        default:
          if (errorCallback) {
            errorCallback();
          } else {
            alert(
              res.payload.message.replace("ErrorInValidParamException:", "")
            );
          }
          return { ...res.payload, content: undefined } as Res;
      }
    } else if (thunk.rejected.match(res)) {
      if (errorCallback) {
        errorCallback();
      } else if (baseEror) {
        baseEror();
      } else {
        alert("통신실패<br/>" + res.type);
      }
      // console.log("api thunk error", res);
      // 정상적인 실패로 통신이 끝나게 하기 위해 에러처리 삭제
      // throw new Error(res.error.message);
    }
  };
  return { apiResult };
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

export type StatePayloadCodeType =
  | "success"
  | "success-none"
  | "fail"
  | "error";

export function statePayloadCode(code: number): StatePayloadCodeType {
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

export function returnRes<
  Res extends AbsIRes<T, K>,
  T = undefined,
  K = undefined,
>(data?: T, page?: K) {
  return {
    code: 200,
    message: "",
    content: data,
    page: page,
  } as Res;
}

/**
 * 스토어 생성시 셋팅을 위해 공통화 처리
 * @param reducer 스토어 생성시 등록될 리듀서 모음
 * @returns
 */
export const createStore = <T extends ICommonsStore>(
  reducer: (state: T | undefined, action: AnyAction) => CombinedState<T>
) => {
  const store = configureStore({
    // reducer 등록
    reducer: reducer,
    // preloadedState,
    // 디버깅 미들웨어 등록
    middleware: gDM =>
      gDM({
        thunk: {
          extraArgument: { store: () => store },
        },
        serializableCheck: false,
        /** 부분 로딩을 적용하기 위한 미들웨어 등록 */
      }).prepend(getLoadingMiddleware()),
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};
