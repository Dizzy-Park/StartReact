import React from "react";
import type { IGridSetting, sortType } from "../GridVo";
import SortHeader from "./SortHeader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GridHeaderFixed<Setting extends IGridSetting<any>[]>(props: {
  id?: string;
  setting?: Setting;
  headerInfo?: {
    fixed?: number | string;
    display?: boolean;
  };
  sortChange?: (position: number, sortId: string, sortType: sortType) => void;
}) {
  const sorted = (position: number, id: string, value: sortType) => {
    if (props.sortChange) {
      props.sortChange(position, id, value);
    }
  };
  return (
    <>
      {props.headerInfo?.fixed !== undefined && (
        <table>
          <caption>testFix</caption>
          <colgroup>
            {props.setting?.map((item, idx) => {
              if (item.display === undefined || item.display) {
                return <col key={idx} style={{ width: item.width }}></col>;
              }
            })}
          </colgroup>
          {props.headerInfo?.display === undefined ||
          props.headerInfo?.display === true ? (
            <thead>
              <tr>
                {props.setting?.map((item, idx) => {
                  if (item.display === undefined || item.display) {
                    if (props.id !== undefined && item.sort !== undefined) {
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
                          dangerouslySetInnerHTML={{ __html: item.header }}
                        />
                      );
                    }
                  }
                })}
              </tr>
            </thead>
          ) : (
            <></>
          )}
          <tbody></tbody>
        </table>
      )}
    </>
  );
}

export default GridHeaderFixed;
