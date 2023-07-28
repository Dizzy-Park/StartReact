import React from "react";
import type { ReactNode } from "react";
import { type IGridPosition, type IGridSetting, subkeySplit } from "../GridVo";

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

export default WidthSubscription;
