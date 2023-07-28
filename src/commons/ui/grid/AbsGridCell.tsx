import moment from "moment";
import React from "react";
import styled from "styled-components";
import type { IGrideCell } from "./GridVo";

/**
 * 텍스트 셀
 * @param props
 * @returns
 */
export function GridTextCell(props: IGrideCell<[string]>) {
  return (
    <>
      <p>{props.data[0]}</p>
    </>
  );
}

const LeftP = styled.p`
  text-align: left;
`;
/**
 * 텍스트 셀
 * @param props
 * @returns
 */
export function GridLeftTextCell(props: IGrideCell<[string]>) {
  return (
    <>
      <LeftP>{props.data[0]}</LeftP>
    </>
  );
}

/**
 * 가격 셀
 * @param props
 * @returns
 */
export function GridLocalStringCell(props: IGrideCell<[number]>) {
  return (
    <>
      <p>{props.data[0].toLocaleString("ko-kr")}</p>
    </>
  );
}

/**
 * 날짜 셀
 * @param props
 * @returns
 */
export function GridDateCell(props: IGrideCell<[string]>) {
  return (
    <>
      <p>{props.data[0] ? moment(props.data[0]).format("YYYY-MM-DD") : "-"}</p>
    </>
  );
}

export function GridDateTimeCell(props: IGrideCell<[string]>) {
  return (
    <>
      <p>
        {props.data[0]
          ? moment(props.data[0]).format(`YYYY-MM-DD HH:mm:ss`)
          : "-"}
      </p>
    </>
  );
}

/**
 * 이미지 셀
 * @param props
 * @returns
 */
export function GridImageCell(props: IGrideCell<[string]>) {
  return (
    <>
      <img src={props.data[0]} alt="상품이미지" width="70px" height="70px" />
    </>
  );
}

/**
 * 넘버링 셀
 * @param props
 * @returns
 */
export function GridNumberCell(props: IGrideCell<[number]>) {
  return (
    <>
      <p>{props.position.row + 1}</p>
    </>
  );
}
