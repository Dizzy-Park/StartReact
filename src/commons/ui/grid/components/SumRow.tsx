import React from "react";
import styled from "styled-components";
import type { IGridSetting } from "../GridVo";

const SumTr = styled.tr`
  background-color: var(--bg-table-head);
  font-weight: bold;
`;

function getPropertyNumber<T, K extends keyof T>(obj: T, key: K): number {
  return Number(obj[key]);
}

function SumRow<T>(props: {
  data?: Array<T>;
  setting?: Array<IGridSetting<T>>;
  sumOption?: {
    titleSpan: number;
    titleCol: number;
  };
}) {
  const tdList: Array<{ value: number | null; colspan?: number }> = [];
  props.setting?.forEach((set, idx) => {
    if (set.isSum) {
      let sum = 0;
      props.data?.forEach(
        (row: T) => (sum += getPropertyNumber(row, set.id[0] as keyof T))
      );

      tdList.push({ value: sum });
    } else {
      if (props.sumOption && props.sumOption.titleCol === idx) {
        tdList.push({ value: null, colspan: props.sumOption.titleSpan });
      } else {
        if (
          props.sumOption &&
          props.sumOption.titleCol &&
          (idx < props.sumOption.titleCol ||
            idx >= props.sumOption.titleCol + props.sumOption.titleSpan)
        ) {
          tdList.push({ value: null });
        }
      }
    }
  });

  return (
    <SumTr className="none">
      {tdList.map(
        (td: { value: number | null; colspan?: number }, idx: number) => {
          if (td.colspan) {
            return (
              <td key={idx} colSpan={td.colspan}>
                합계
              </td>
            );
          } else {
            return <td key={idx}>{td.value?.toLocaleString()}</td>;
          }
        }
      )}
    </SumTr>
  );
}

export default SumRow;
