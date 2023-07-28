import React from "react";
import styled from "styled-components";
import {
  useGridOptionInit,
  useGridSort,
  useGridSortValue,
} from "../store/GridHook";
import type { IGridSetting, sortType } from "../GridVo";

const ThStyle = styled.th<{ color?: string }>`
  position: relative;
  &::after {
    position: absolute;
    top: 64%;
    right: 2px;
    display: block;
    width: 0px;
    height: 0px;
    border-bottom: 8px solid #666666;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translateY(-50%) rotate(180deg);
    content: "";
  }
  &::before {
    position: absolute;
    top: 38%;
    right: 2px;
    display: block;
    width: 0px;
    height: 0px;
    border-bottom: 8px solid #666666;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translateY(-50%);
    content: "";
  }
  &.asc {
    &::before {
      border-bottom-color: ${props => (props.color ? props.color : "#fff")};
    }
  }
  &.desc {
    &::after {
      border-bottom-color: ${props => (props.color ? props.color : "#fff")};
    }
  }
`;

function SortHeader<Setting>(props: {
  header: string;
  sort?: {
    id: string;
    init?: sortType;
    activeColor?: string;
  };
  sorted: (position: number, sortId: string, sortType: sortType) => void;
  index: number;
  setting: Array<IGridSetting<Setting>> | undefined;
  gridId?: string;
}) {
  const click = useGridSort(props.gridId!, props.sort!.id);
  const [key, value] = useGridSortValue(props.gridId!);

  const toggle = () => {
    if (props.sort && props.gridId) {
      click(
        key
          ? key === props.sort.id
            ? value === "desc"
              ? "asc"
              : "desc"
            : "desc"
          : "desc"
      );
      props.sorted(
        props.index,
        props.sort.id,
        key
          ? key === props.sort.id
            ? value === "desc"
              ? "asc"
              : "desc"
            : "desc"
          : "desc"
      );
    }
  };
  useGridOptionInit(
    "gridSort",
    props.sort && props.sort.init && { [props.sort.id]: props.sort.init },
    props.gridId
  );

  return (
    <ThStyle
      scope="col"
      dangerouslySetInnerHTML={{
        __html: props.header,
      }}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        toggle();
      }}
      className={`sort ${props.sort && props.sort.id === key && value}`}
      color={props.sort?.activeColor}
    ></ThStyle>
  );
}

export default SortHeader;
