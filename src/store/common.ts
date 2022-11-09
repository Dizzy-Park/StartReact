import { AsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { IRes } from "commons/Http";
import { AsyncThunkConfig, createThunk, useAbsApi } from "commons/store/common";
import Button from "components/atoms/Button";
import { State } from "store";

export interface IPageable {
  total_elements: number;
  page: number;
  size: number;
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
  thunk: AsyncThunkPayloadCreator<
    IRes<Returned>,
    ThunkArg,
    AsyncThunkConfig<State>
  >
): AsyncThunk<IRes<Returned>, ThunkArg, AsyncThunkConfig<State>> => {
  return createThunk<State, Returned, ThunkArg>(type, thunk);
};

export const useApi = () => {
  return useAbsApi<State>(Button, "80%");
};
