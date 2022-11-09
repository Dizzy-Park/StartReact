import React, { Fragment, Key, ReactNode } from "react";
import styled, { css, StyledComponent } from "styled-components";
import { IGridPosition, IGridSetting, subkeySplit } from "./GridVo";

const SumTr = styled.tr`
  background-color: ${props => props.theme.colors.bgTableHead};
  font-weight: bold;
`;

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

/**
 * table
 */

export const TableContainer = styled.div<{
  direction: "col" | "row";
  over?: boolean;
  height?: number;
}>`
  border-bottom: 1px solid ${props => props.theme.colors.borderPrimary};
  & table {
    table-layout: fixed;
    min-width: 100%;
    border-top: 1px solid ${props => props.theme.colors.borderDark};
    background-color: ${porps => porps.theme.colors.bodyBackground};
    & thead {
      border-bottom: 1px solid ${props => props.theme.colors.borderPrimary};
      & th {
        height: 57px;
      }
    }
    & tr {
      border-top: 1px solid ${props => props.theme.colors.bgGrey};
      &:first-child {
        border-top: 0;
      }
    }
    & th,
    & td {
      height: 67px;
      padding: 10px;
      vertical-align: middle;
      white-space: nowrap;
      text-align: center;
      &.space-normal {
        white-space: normal;
      }
    }
    & th {
      background-color: ${props => props.theme.colors.bgTableHead};
      font-weight: 500;
      font-size: 12px;
      word-break: keep-all;
      & em {
        margin-left: 2px;
        color: ${props => props.theme.colors.negative};
      }
    }
    & td {
      color: ${props => props.theme.colors.fontPrimary};
    }
  }
  ${props => (props.over ? "overflow: auto;" : "")}
  ${props => (props.height ? `max-height: ${props.height}px;` : "")}
  ${props => {
    switch (props.direction) {
      case "row":
        return css`
          & th,
          & td {
            text-align: left;
          }
          & tbody table thead th {
            background-color: ${props.theme.colors.bgTableHead};
          }
        `;
      case "col":
        return css`
          & th,
          & td {
            padding: 15px 10px;
            height: 57px;
            font-size: 13px;
          }
          & th {
            border-left: 1px solid ${props => props.theme.colors.borderPrimary};
            text-align: center;
          }
          & tr > th:first-child,
          & tr > td:first-child {
            border-left: 0;
          }
          & thead th {
            padding: 15px 10px;
          }
          & tbody th {
            border-left: 1px solid ${props => props.theme.colors.borderPrimary};
            font-size: 14px;
            background-color: #fff;
            font-weight: 400;
          }
          & tbody table thead th {
            background-color: ${props => props.theme.colors.bgTableHead};
          }
          & td {
            border-left: 1px solid ${props => props.theme.colors.borderPrimary};
            text-align: center;
          }
        `;
    }
  }}
`;

const ScrollTable = styled.div<{ height?: number }>`
  ${props => {
    if (props.height) {
      return css`
        display: block;
        max-height: ${props.height}px;
        overflow: auto;
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

interface IWidthSubscriptionProps<T> {
  position: IGridPosition;
  data: T;
  setting?: IGridSetting<T>;
  change: (position: IGridPosition, value?: T) => void;
}

function WidthSubscription<T>(props: IWidthSubscriptionProps<T>) {
  if (props.data !== undefined) {
    const dt = props.setting?.id.map(item => {
      return subkeySplit(props.data, item);
    });
    if (props.setting && props.setting.element) {
      const Component = props.setting.element;
      return (
        <Component
          data={dt}
          link={props.setting.link}
          position={props.position}
          buttonOption={props.setting.button}
          change={props.change}
        />
      );
    } else {
      return (
        <>
          {dt?.map((item, idx) => {
            switch (typeof item) {
              case "object":
                return <p key={idx}>{JSON.stringify(item)}</p>;
              default:
                return (
                  <p key={idx}>
                    {item !== undefined ? (item as unknown as ReactNode) : "-"}
                  </p>
                );
            }
          })}
        </>
      );
    }
  } else {
    return <></>;
  }
}

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

function getPropertyKey<T, K extends keyof T>(obj: T, key: K): Key {
  return obj[key] as unknown as Key;
}

function getPropertyNumber<T, K extends keyof T>(obj: T, key: K): number {
  return Number(obj[key]);
}

function SumRow<T>(props: {
  data?: Array<T>;
  setting?: Array<IGridSetting<T>>;
  colspan?: {
    value: number;
    start: number;
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
      if (props.colspan && props.colspan.start === idx) {
        tdList.push({ value: null, colspan: props.colspan.value });
      } else {
        if (
          (props.colspan && idx < props.colspan.start) ||
          (props.colspan && idx >= props.colspan.start + props.colspan.value)
        ) {
          tdList.push({ value: null });
        }
      }
    }
  });

  return (
    <SumTr>
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

interface IGridRow<Data> {
  idx: number;
  rowId?: keyof Data;
  setting: IGridSetting<Data>[];
  data: Data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change: (position: IGridPosition, value?: any) => void;
  textWrap?: boolean;
}

function GridRow<Data>(props: IGridRow<Data>) {
  const row = Math.max(
    ...props.setting.map(hitem => {
      return hitem.span
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (subkeySplit(props.data, hitem.span) as unknown as Array<any>).length
        : 1;
    })
  );
  const rowAr = new Array(row);
  for (let i = 0; i < row; i++) {
    rowAr[i] = i;
  }
  const getTrKey = (i: number) => {
    const key = `${
      props.rowId ? getProperty(props.data, props.rowId) : props.idx
    }_${i}`;
    return key;
  };
  const getTdKey = (i: number, hitem: string, idx: number) => {
    const key = getTrKey(i);
    return `${key}_${hitem}_${idx}`;
  };
  return (
    <>
      {rowAr.map((_, i) => {
        return (
          <tr
            key={`${
              props.rowId ? getProperty(props.data, props.rowId) : props.idx
            }_${i}`}
          >
            {props.setting?.map((hitem, hidx) =>
              hitem.display === undefined || hitem.display ? (
                hitem.span === undefined ? (
                  hitem.tdDisplayNone ? (
                    <Fragment key={getTdKey(i, hitem.id.join("_"), hidx)}>
                      {WidthSubscription({
                        position: { col: hidx, row: props.idx, span: i },
                        data: props.data,
                        setting: hitem,
                        change: props.change,
                      })}
                    </Fragment>
                  ) : (
                    <td
                      key={getTdKey(i, hitem.id.join("_"), hidx)}
                      className={props.textWrap ? "space-normal" : ""}
                    >
                      {WidthSubscription({
                        position: { col: hidx, row: props.idx, span: i },
                        data: props.data,
                        setting: hitem,
                        change: props.change,
                      })}
                    </td>
                  )
                ) : i === 0 ? (
                  hitem.tdDisplayNone ? (
                    <Fragment key={getTdKey(i, hitem.id.join("_"), hidx)}>
                      {WidthSubscription({
                        position: { col: hidx, row: props.idx, span: i },
                        data: props.data,
                        setting: hitem,
                        change: props.change,
                      })}
                    </Fragment>
                  ) : (
                    <td
                      rowSpan={row}
                      key={getTdKey(i, hitem.id.join("_"), hidx)}
                      className={props.textWrap ? "space-normal" : ""}
                    >
                      {WidthSubscription({
                        position: { col: hidx, row: props.idx, span: i },
                        data: props.data,
                        setting: hitem,
                        change: props.change,
                      })}
                    </td>
                  )
                ) : (
                  <Fragment
                    key={getTdKey(i, hitem.id.join("_"), hidx)}
                  ></Fragment>
                )
              ) : (
                <Fragment
                  key={getTdKey(i, hitem.id.join("_"), hidx)}
                ></Fragment>
              )
            )}
          </tr>
        );
      })}
    </>
  );
}

export interface IGridProps<Data, Setting, Not> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container?: StyledComponent<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  not?: React.FC<Not>;
  setting?: Setting;
  rowId?: keyof Data;
  data?: Array<Data>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change?: (position: IGridPosition, value?: any) => void;
  sumOption?: {
    isUse: boolean;
    colspan?: {
      value: number;
      start: number;
    };
  };
  headerFixed?: { type: boolean; height: number };
  textWrap?: boolean;
  emptyMsg?: Not;
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
  const Table = props.container ? props.container : TableContainer;
  const NotDisplay = props.not ? props.not : undefined;

  return (
    <Table direction="column" over={true}>
      {props.headerFixed?.type && (
        <table>
          <caption>testFix</caption>
          <colgroup>
            {props.setting?.map((item, idx) => {
              if (item.display === undefined || item.display) {
                return <col key={idx} style={{ width: item.width }}></col>;
              }
            })}
          </colgroup>
          <thead>
            <tr>
              {props.setting?.map((item, idx) => {
                switch (item.header) {
                  case "checkbox":
                    if (item.isAllCheck) {
                      return <th key={idx + 1} scope="col"></th>;
                    } else {
                      return (
                        <th key={idx + 1} scope="col">
                          선택
                        </th>
                      );
                    }
                  default:
                    if (item.display === undefined || item.display) {
                      return (
                        <th
                          key={idx + 1}
                          scope="col"
                          dangerouslySetInnerHTML={{ __html: item.header }}
                        />
                      );
                    }
                }
              })}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      )}
      <ScrollTable height={props.headerFixed?.height}>
        <table>
          <caption>test</caption>
          <colgroup>
            {props.setting?.map((item, idx) => {
              if (item.display === undefined || item.display) {
                return <col key={idx} style={{ width: item.width }}></col>;
              }
            })}
          </colgroup>
          <thead>
            {props.headerFixed === undefined && (
              <>
                <tr>
                  {props.setting?.map((item, idx) => {
                    const HeaderElement = item.headerElement;
                    if (HeaderElement === undefined) {
                      switch (item.header) {
                        case "checkbox":
                          if (item.isAllCheck) {
                            return <th key={idx} scope="col"></th>;
                          } else {
                            return <th key={idx} scope="col"></th>;
                          }
                        default:
                          if (item.display === undefined || item.display) {
                            return (
                              <th
                                key={idx}
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
          <tbody>
            {props.data !== undefined && props.data.length === 0 ? (
              <>
                {props.not !== undefined &&
                props.emptyMsg !== undefined &&
                NotDisplay !== undefined ? (
                  <tr>
                    <td colSpan={props.setting?.length}>
                      <NotDisplay {...props.emptyMsg} />
                    </td>
                  </tr>
                ) : (
                  <EmptyList>
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
                    key={props.rowId ? getPropertyKey(item, props.rowId) : idx}
                    idx={idx}
                    data={item}
                    rowId={props.rowId}
                    setting={props.setting!}
                    change={change}
                    textWrap={props.textWrap}
                  />
                ))}
                {props.sumOption && props.sumOption.isUse && (
                  <>
                    {SumRow<Data>({
                      data: props.data,
                      setting: props.setting,
                      colspan: props.sumOption.colspan,
                    })}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </ScrollTable>
    </Table>
  );
}
export default Grid;
