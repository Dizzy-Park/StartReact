import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { ICommonsStore } from "..";
import { useSelectorEq } from "../store/common";
import { rdxSetUi, rdxRemoveUi, rdxTotalSetUi } from "./uiR";
import { UiType, type IUiAction } from "./uiVo";

export const useGridCheckBox = (
  id: string,
  init?: boolean,
  setValue?: (value: boolean) => void
) => {
  const { checkValue } = useSelectorEq((state: ICommonsStore) => ({
    checkValue:
      state.ui.gridCheckbox !== undefined
        ? state.ui.gridCheckbox[id]
        : undefined,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkValue === undefined) {
      dispatch(rdxSetUi({ type: UiType.GRID_CHECKBOX, key: id, value: init }));
    }
    return () => {
      dispatch(rdxRemoveUi({ type: UiType.GRID_CHECKBOX, key: id }));
    };
  }, []);
  const changeCheck = (value: boolean) => {
    dispatch(rdxSetUi({ type: UiType.GRID_CHECKBOX, key: id, value: value }));
    if (setValue) {
      setValue(value);
    }
  };
  return { checkValue, changeCheck };
};

/**
 * GridCheckBox 정의
 */
export const useGridCheckBoxValue = () => {
  const { totalValue } = useSelectorEq((state: ICommonsStore) => ({
    totalValue:
      state.ui.gridCheckbox !== undefined ? state.ui.gridCheckbox : undefined,
  }));
  const [disableFlag, setDisableFlag] = useState<boolean>(false);

  const checkValues = <T>() => {
    if (totalValue !== undefined) {
      return Object.keys(totalValue)
        .filter(item => totalValue[item] === true)
        .map(item => item as unknown as T);
    } else {
      return [];
    }
  };

  const dispatch = useDispatch();

  const setTotalGridValue = (flag: boolean) => {
    if (totalValue !== undefined) {
      const gridCheckBox: IUiAction[] = Object.keys(totalValue).map(item => {
        return {
          type: UiType.GRID_CHECKBOX,
          key: item,
          value: flag,
        };
      });
      dispatch(rdxTotalSetUi(gridCheckBox));
    }
  };

  useEffect(() => {
    if (checkValues().length === 0) {
      setDisableFlag(false);
    } else {
      setDisableFlag(true);
    }
  }, [totalValue]);
  return { totalValue, checkValues, setTotalGridValue, disableFlag };
};
