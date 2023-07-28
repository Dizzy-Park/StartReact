import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { mouseUp } from "../../utils";
import useLayer from "../store/layerHook";
import moment from "moment";

const CalenderWrap = styled.div`
  overflow: hidden;
  position: absolute;
  border: solid 1px #e1e1e1;
  border-radius: 5px;
  cursor: auto;
  font-family: "DMSans";
  z-index: 20;
  & ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  & div:first-child {
    background-color: #fff;
    border-bottom: 1px solid #e1e1e1;
    color: #323232;
  }
`;

const CalenderMonth = styled.ul`
  padding: 10px 0px 10px 0px;
  & li {
    flex: 1 1 auto;
    display: flex;
    padding: 5px 0;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    &:first-child {
      cursor: pointer;
      width: 11%;
    }
    &:last-child {
      cursor: pointer;
      width: 11%;
    }
    & span:first-child {
      margin-right: 5px;
      font-size: 15px;
    }
    & span:last-child {
      font-size: 15px;
    }
  }
`;

const CalenderWeek = styled.div`
  color: #131313;
  background-color: #ffffff;
  padding: 10px 5px 10px 5px;
  & li {
    width: 30px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & ul:nth-child(1n + 2) li:hover {
    background-color: #ebe8e8;
  }
  /* & ul:nth-child(1n + 2) {
    cursor: pointer;
  } */
`;

enum ColorType {
  RED = "red",
  BLUE = "blue",
  GRAY = "gray",
  BLACK = "black",
}

const CalenderDay = styled.li<{
  active?: boolean;
  color: ColorType;
  prev?: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    ${props => (props.disabled ? `cursor: default` : `cursor: pointer`)}
  }
  ${props => (props.prev ? "opacity: 0.3;" : "")}
  ${props => (props.active ? "background-color: #ffe5d4;" : "")}
  ${props =>
    props.disabled
      ? `
          pointer-events: none;
          opacity: 0.6;
        `
      : ""}
  ${props => {
    switch (props.color) {
      case ColorType.RED:
        return css`
          color: var(--font-red);
        `;
      case ColorType.BLUE:
        return css`
          color: var(--font-blue);
        `;
      case ColorType.GRAY:
        return css`
          background-color: var(--disable);
        `;
      case ColorType.BLACK:
        return css`
          color: #323232;
        `;
    }
  }}
`;

interface IDay {
  date: number;
  time: number;
  active: boolean;
  color: ColorType;
  prev: boolean;
  disabled: boolean;
}
interface IDisableCondition {
  baseDate?: string;
  directionType?: "before" | "after";
  calc?: {
    calcType: "day" | "month" | "year";
    calcNum: number;
  };
}

function Calender() {
  const selectWrapperRef = useRef(null);
  const { contentHeight, data, close, selected } = useLayer<{
    currentDate: Date;
    disableCondition?: IDisableCondition;
  }>();
  const [current] = useState(
    data ? new Date(data.data.currentDate) : new Date()
  );
  const [select] = useState<Date>(data ? data.data.currentDate : new Date());
  const [display, setDisplay] = useState([] as Array<Array<IDay>>);
  const getActive = (year: number, month: number, date: number) => {
    return (
      select &&
      select.getFullYear() === year &&
      select.getMonth() + 1 === month &&
      select.getDate() === date
    );
  };
  const getColor = (day: number) => {
    switch (day) {
      case 0:
        return ColorType.RED;
      case 6:
        return ColorType.BLUE;
      default:
        return ColorType.BLACK;
    }
  };
  const leftHandler = () => {
    current.setMonth(current.getMonth() - 1);
    drawCalender();
  };
  const rightHandler = () => {
    current.setMonth(current.getMonth() + 1);
    drawCalender();
  };
  const selectedHandler = (time: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selected(new Date(time) as any);
    close();
  };
  const drawCalender = () => {
    const vd = new Date(current);
    vd.setDate(1);
    vd.setDate(1 - vd.getDay());

    const li: Array<Array<IDay>> = [];
    let i, k, color;
    for (i = 0; i < 6; i++) {
      li[i] = [];
      for (k = 0; k < 7; k++) {
        color = getColor(vd.getDay());

        li[i][k] = {
          date: vd.getDate(),
          time: vd.getTime(),
          active: getActive(vd.getFullYear(), vd.getMonth() + 1, vd.getDate()),
          color: color,
          prev: current.getMonth() !== vd.getMonth(),
          disabled: getDisabled(vd) || false,
        };

        vd.setDate(vd.getDate() + 1);
      }
    }
    setDisplay(li);
  };

  const getDisabled = (vd: Date) => {
    const baseDate = data?.data.disableCondition
      ? moment(data?.data.disableCondition.baseDate)
      : moment();
    const valueDate = moment(vd);

    if (data?.data.disableCondition) {
      if (data?.data.disableCondition.directionType === "before") {
        if (data?.data.disableCondition.calc) {
          switch (data?.data.disableCondition.calc.calcType) {
            case "day":
              return valueDate.isBefore(
                baseDate.subtract(
                  data?.data.disableCondition.calc.calcNum,
                  "days"
                )
              );
            case "month":
              return valueDate.isBefore(
                baseDate.subtract(
                  data?.data.disableCondition.calc.calcNum,
                  "months"
                )
              );
            case "year":
              return valueDate.isBefore(
                baseDate.subtract(
                  data?.data.disableCondition.calc.calcNum,
                  "years"
                )
              );
          }
        } else {
          return valueDate.isBefore(baseDate);
        }
      } else {
        if (data?.data.disableCondition.calc) {
          switch (data?.data.disableCondition.calc.calcType) {
            case "day":
              if (valueDate.isAfter(baseDate)) {
                return valueDate.isAfter(
                  baseDate.add(data?.data.disableCondition.calc.calcNum, "days")
                );
              } else {
                return valueDate.isBefore(baseDate);
              }
            case "month":
              if (valueDate.isAfter(baseDate)) {
                return valueDate.isAfter(
                  baseDate.add(
                    data?.data.disableCondition.calc.calcNum,
                    "months"
                  )
                );
              } else {
                return valueDate.isBefore(baseDate);
              }
            case "year":
              if (valueDate.isAfter(baseDate)) {
                return valueDate.isAfter(
                  baseDate.add(
                    data?.data.disableCondition.calc.calcNum,
                    "years"
                  )
                );
              } else {
                return valueDate.isBefore(baseDate);
              }
          }
        } else {
          return valueDate.isAfter(baseDate);
        }
      }
    }
  };
  const getPosition = () => {
    if (data?.rect) {
      const h: DOMRect =
        contentHeight !== undefined ? contentHeight() : new DOMRect();
      return {
        left: Math.min(data.rect.x, window.innerWidth - 225) + "px",
        top:
          (data.rect.y + data.rect.height > h.height
            ? data.rect.y - data.rect.height - 220
            : data.rect.y + data.rect.height + (h.top - 70) * -1) + "px",
      };
    }
    return { left: "0px", top: "0px" };
  };
  useEffect(() => {
    drawCalender();
    mouseUp(selectWrapperRef, close, selectWrapperRef);
  }, []);
  return (
    <CalenderWrap ref={selectWrapperRef} style={getPosition()}>
      <div>
        <CalenderMonth>
          <li onClick={leftHandler}>
            <img
              style={{
                width: "15px",
                height: "15px",
                transform: "rotate(180deg)",
              }}
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E %3Cpath stroke='%23323232' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.3' d='M4.889 2.4l6.222 5.778-6.222 5.777'/%3E%3C/svg%3E"
            />
          </li>
          <li>
            <span>{current.getFullYear()}년</span>
            <span>{current.getMonth() + 1}월</span>
          </li>
          <li onClick={rightHandler}>
            <img
              style={{
                width: "15px",
                height: "15px",
                transform: "rotate(0deg)",
              }}
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E %3Cpath stroke='%23323232' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.3' d='M4.889 2.4l6.222 5.778-6.222 5.777'/%3E%3C/svg%3E"
            />
          </li>
        </CalenderMonth>
      </div>
      <CalenderWeek>
        <ul>
          <li>일</li>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li>토</li>
        </ul>
        {display.map((days, didx) => (
          <ul key={didx}>
            {days.map((day, idx) => (
              <CalenderDay
                key={idx}
                prev={day.prev}
                active={day.active}
                color={day.color}
                disabled={day.disabled}
                onClick={selectedHandler.bind(null, day.time)}
              >
                {day.date}
              </CalenderDay>
            ))}
          </ul>
        ))}
      </CalenderWeek>
    </CalenderWrap>
  );
}
export default Calender;
