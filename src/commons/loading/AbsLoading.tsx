import React from "react";
import Spinner from "./display/Spinner";
import useLoading from "./store/loadingHook";
import styled from "styled-components";

const LoadArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export interface IAbsLoadingProps {
  id: string;
  thunkType: string;
  className?: string;
  spinnerSize?: number;
  children?: React.ReactNode | React.ReactNode[];
}

/**
 * 이 코드는 `useLoading` 커스텀 훅을 사용하여 로딩 상태를 관리하고,
 * `isLoading`과 `areaLoading` 변수를 통해 로딩 상태를 확인하여 로딩 중일 때는 Spinner를 렌더링하고,
 * 로딩이 끝나면 children을 렌더링하는 컴포넌트이다.
 * @param props
 * @returns
 */
function AbsLoading(props: IAbsLoadingProps) {
  const { isLoading, areaLoading } = useLoading(props.id, props.thunkType);
  return (
    <>
      {isLoading === false && areaLoading === false ? (
        <>{props.children}</>
      ) : (
        <LoadArea className={props.className}>
          <Spinner size={props.spinnerSize ? props.spinnerSize : 120} />
        </LoadArea>
      )}
    </>
  );
}

export default AbsLoading;
