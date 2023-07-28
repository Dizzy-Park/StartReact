import React, { Fragment } from "react";
import {
  useGridOptionInit,
  //   useGridSubInit,
  useGridSubValue,
} from "../store/GridHook";
import {
  type IGrideSub,
  type IGridPosition,
  type IGridSetting,
  subkeySplit,
} from "../GridVo";
import WidthSubscription from "./WidthSubscription";

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

interface IGridRow<Data> {
  rootId?: string;
  idx: number;
  rowId?: keyof Data;
  setting: IGridSetting<Data>[];
  subRowElement?: React.ReactNode;
  data: Data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  change: (position: IGridPosition, value?: any) => void;
  click?: (position: IGridPosition, value?: Data) => void;
  textWrap?: boolean;
  select?: number;
  subinfo?: {
    element?: React.FC<IGrideSub<Data>>;
  };
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
  const subvalue = useGridSubValue(props.rootId!, props.idx);
  const SubElement = props.subinfo?.element;
  useGridOptionInit(
    "gridSub",
    props.subinfo ? { [row]: false } : undefined,
    props.rootId
  );
  return (
    <>
      {rowAr.map((_, i) => {
        return (
          <tr
            className={
              props.select !== undefined && props.select === props.idx
                ? `active`
                : ``
            }
            key={`${
              props.rowId ? getProperty(props.data, props.rowId) : props.idx
            }_${i}`}
            onClick={props.click?.bind(
              null,
              {
                col: 0,
                row: props.idx,
                span: i,
              },
              props.data
            )}
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
      {props.rootId &&
      props.subinfo &&
      subvalue &&
      props.setting &&
      SubElement ? (
        <tr className="none">
          <td colSpan={props.setting.length}>
            <SubElement
              position={{ col: 0, row: props.idx, span: 0 }}
              data={props.data}
            />
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  );
}

export default GridRow;
