import React, { type ForwardedRef, type Key, useRef } from "react";
import styled, { css, type IStyledComponent } from "styled-components";
import GridHeaderFixed from "./components/GridHeaderFixed";
import GridRow from "./components/GridRow";
import SortHeader from "./components/SortHeader";
import SumRow from "./components/SumRow";
import { TableContainer } from "./GridStyled";
import type {
  IGrideSub,
  IGridPosition,
  IGridSetting,
  sortType,
} from "./GridVo";
import { useIntersectionObserver } from "./store/GridHook";
import AbsLoading from "commons/loading/AbsLoading";

const EmptyList = styled.tr<{ iconType?: string }>`
  > td:first-of-type::before {
    display: block;
    content: "";
    ${props => {
      switch (props.iconType) {
        case "shipping":
          return css`
            padding: 85px 60px 5px 60px;
            background: url("../../../images/icon/icon_all_count.svg") no-repeat
              center center;
            background-size: 60px;
          `;
        default:
          break;
      }
    }}
  }
`;

const ScrollTable = styled.div<{ over?: boolean; height?: number | string }>`
  ${props => (props.over ? "overflow: auto;" : "")}
  ${props => {
    if (props.height) {
      return css`
        display: block;
        max-height: ${typeof props.height === "number"
          ? `${props.height}px`
          : props.height};
        overscroll-behavior: contain;

        &::-webkit-scrollbar {
          display: none;
        }

        table {
          border-top: 0;
          thead {
            display: none;
          }
        }
      `;
    }
  }}
`;

function getPropertyKey<T, K extends keyof T>(obj: T, key: K): Key {
  return obj[key] as unknown as Key;
}

export interface IGridProps<Data, Setting, Not> {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container?: IStyledComponent<any, any>;
  layoutOverflow?: boolean;
  setting?: Setting;
  rowId?: keyof Data;
  data?: Array<Data>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change?: (position: IGridPosition, value?: any) => void;
  sortChange?: (position: number, sortId: string, sortType: sortType) => void;
  sumOption?: {
    titleSpan?: number;
    titleCol?: number;
  };
  headerInfo?: {
    fixed?: number | string;
    display?: boolean;
    scrollRef?: ForwardedRef<HTMLDivElement>;
  };
  selectInfo?: {
    select?: number;
    click?: (position: IGridPosition, value?: Data) => void;
  };
  emptyInfo?: { element: React.FC<Not>; props: Not };
  /** 무한 리스트 만들기 위한 값 */
  infiniteInfo?: {
    /** 현제 페이지 번호 */
    current: number;
    /** 전체 페이지 번호 */
    total: number;
    /** 페이지 로드시 호출되는 함수 */
    infiniteCallback: () => void | Promise<void>;
    /** 동시성 페이징 현상을 막기위한 prefix {@link AsyncThunk} */
    typePrefix: string;
  };
  textWrap?: boolean;
  subinfo?: {
    element?: React.FC<IGrideSub<Data>>;
  };
}

function Grid<
  Data,
  Setting extends IGridSetting<Data>[],
  Not extends { text?: string; message?: string }
>(props: IGridProps<Data, Setting, Not>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const change = (position: IGridPosition, value?: any) => {
    if (props.change) {
      props.change(position, value);
    }
  };
  const click = (position: IGridPosition, value?: Data) => {
    if (props.selectInfo?.click) {
      props.selectInfo.click(position, value);
    }
  };

  const sorted = (position: number, id: string, value: sortType) => {
    if (props.sortChange) {
      props.sortChange(position, id, value);
    }
  };

  const Table = props.container ? props.container : TableContainer;
  const NotDisplay = props.emptyInfo?.element
    ? props.emptyInfo.element
    : undefined;

  const loader = useRef<HTMLDivElement>(null);
  useIntersectionObserver(
    loader,
    props.id,
    props.infiniteInfo,
    props.data?.length
  );

  return (
    <Table
      id={props.id}
      direction="col"
      over={props.layoutOverflow === undefined ? true : props.layoutOverflow}
      selected={props.selectInfo !== undefined}
      ref={
        props.headerInfo?.display !== undefined
          ? props.headerInfo?.scrollRef
          : null
      }
    >
      <GridHeaderFixed
        id={props.id}
        setting={props.setting}
        headerInfo={
          props.headerInfo
            ? {
                fixed: props.headerInfo.fixed,
                display: props.headerInfo.display,
              }
            : undefined
        }
        sortChange={props.sortChange}
      />
      <ScrollTable
        height={props.headerInfo ? props.headerInfo.fixed : undefined}
        over={props.layoutOverflow}
        ref={props.headerInfo?.scrollRef}
      >
        <table>
          <caption>test</caption>
          <colgroup>
            {props.setting?.map((item, idx) => {
              if (item.display === undefined || item.display) {
                return <col key={idx} style={{ width: item.width }}></col>;
              }
            })}
          </colgroup>
          {props.headerInfo === undefined ||
          props.headerInfo.display === true ? (
            <thead>
              {props.headerInfo?.fixed === undefined && (
                <>
                  <tr>
                    {props.setting?.map((item, idx) => {
                      const HeaderElement = item.headerElement;
                      if (HeaderElement === undefined) {
                        if (item.display === undefined || item.display) {
                          if (props.id && item.sort) {
                            return (
                              <SortHeader
                                gridId={props.id}
                                header={item.header}
                                sort={item.sort}
                                key={idx + 1}
                                index={idx}
                                setting={props.setting}
                                sorted={sorted}
                              />
                            );
                          } else {
                            return (
                              <th
                                key={idx + 1}
                                scope="col"
                                dangerouslySetInnerHTML={{
                                  __html: item.header,
                                }}
                              />
                            );
                          }
                        }
                      } else {
                        return (
                          <th key={idx} scope="col">
                            <HeaderElement header={item.header} />
                          </th>
                        );
                      }
                    })}
                  </tr>
                </>
              )}
            </thead>
          ) : (
            <></>
          )}
          <tbody>
            {props.data !== undefined && props.data.length === 0 ? (
              <>
                {props.emptyInfo !== undefined && NotDisplay !== undefined ? (
                  <tr className="none">
                    <td colSpan={props.setting?.length}>
                      <NotDisplay {...props.emptyInfo.props} />
                    </td>
                  </tr>
                ) : (
                  <EmptyList className="none">
                    <td colSpan={props.setting?.length}>
                      <p>내용없음</p>
                    </td>
                  </EmptyList>
                )}
              </>
            ) : (
              <>
                {props.data?.map((item, idx) => (
                  <GridRow
                    rootId={props.id}
                    key={props.rowId ? getPropertyKey(item, props.rowId) : idx}
                    idx={idx}
                    data={item}
                    rowId={props.rowId}
                    setting={props.setting!}
                    change={change}
                    textWrap={props.textWrap}
                    click={click}
                    select={props.selectInfo?.select}
                    subinfo={props.subinfo}
                  />
                ))}
                {props.sumOption && (
                  <SumRow
                    data={props.data}
                    setting={props.setting}
                    sumOption={
                      props.sumOption
                        ? {
                            titleCol: props.sumOption.titleCol
                              ? props.sumOption.titleCol
                              : 0,
                            titleSpan: props.sumOption.titleSpan
                              ? props.sumOption.titleSpan
                              : 1,
                          }
                        : undefined
                    }
                  />
                )}
              </>
            )}
          </tbody>
        </table>
        {props.infiniteInfo && (
          <AbsLoading id={props.id!} thunkType={props.infiniteInfo.typePrefix}>
            <div ref={loader} />
          </AbsLoading>
        )}
      </ScrollTable>
    </Table>
  );
}
export default Grid;
