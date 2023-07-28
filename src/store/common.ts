import type { AsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import type { AbsIRes } from "commons/Http";
import {
  absCreatePageThunk,
  absCreateThunk,
  type AbsAsyncThunkConfig,
  type StatePayloadCodeType,
  useAbsApi,
} from "commons/store/common";
import type { Dispatch } from "store/configureStore";
import type { IState } from ".";

export interface IList<T> {
  page_info: IPageable;
  list: Array<T>;
}

export interface IPageable {
  total_elements: number;
  page: number;
  size: number;
  sort: string;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type AsyncThunkConfig = AbsAsyncThunkConfig<IState> & {
  dispatch?: Dispatch;
};

export interface IRes<T, P = undefined> extends AbsIRes<T, P> {
  // AD 공통 사용중 단일 데이터 data, 페이지 데이터 page
  data?: T;
  list?: Array<T>;
}

/**
 *
 * @param type
 * @param thunk
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAppThunk = <Returned, ThunkArg = undefined>(
  type: string,
  thunk: AsyncThunkPayloadCreator<IRes<Returned>, ThunkArg, AsyncThunkConfig>
): AsyncThunk<IRes<Returned>, ThunkArg, AsyncThunkConfig> => {
  return absCreateThunk<IState, IRes<Returned>, Returned, ThunkArg>(
    type,
    thunk
  );
};

export const createAppParamThunk = <ThunkArg = undefined>(
  type: string,
  thunk: AsyncThunkPayloadCreator<IRes<undefined>, ThunkArg, AsyncThunkConfig>
): AsyncThunk<IRes<undefined>, ThunkArg, AsyncThunkConfig> => {
  return absCreateThunk<IState, IRes<undefined>, undefined, ThunkArg>(
    type,
    thunk
  );
};

export const createAppPageThunk = <
  Returned,
  Pageable = undefined,
  ThunkArg = undefined,
>(
  type: string,
  thunk: AsyncThunkPayloadCreator<
    IRes<Returned, Pageable>,
    ThunkArg,
    AsyncThunkConfig
  >
): AsyncThunk<IRes<Returned, Pageable>, ThunkArg, AsyncThunkConfig> => {
  return absCreatePageThunk<
    IState,
    IRes<Returned, Pageable>,
    Returned,
    ThunkArg,
    Pageable
  >(type, thunk);
};

export const useApi = () => {
  const absApi = useAbsApi<IState>(undefined, undefined, statePayloadCode);
  const apiResult = async <Returned, Pageable, ThunkArg>(
    thunk: AsyncThunk<IRes<Returned, Pageable>, ThunkArg, AsyncThunkConfig>,
    param?: ThunkArg,
    errorCallback?: () => void
  ): Promise<IRes<Returned, Pageable> | undefined> => {
    return await absApi.apiResult(thunk, param, errorCallback);
  };
  return apiResult;
};

function statePayloadCode(code: number): StatePayloadCodeType {
  if (code > -1) {
    return "success";
  } else {
    return "error";
  }
}
