import type { ICommonsStore } from "commons";
import { useSelectorEq } from "commons/store/common";
import { useEffect } from "react";
import { UiType, type IUiActionValue } from "../../uiVo";
import { useUiAction } from "../../useUihook";
import type { IGridPageableDo } from "../GridVo";
import {
  addInit,
  privateUseInitCallback,
  privateUseRemoveCallback,
  removeEnd,
} from "commons/ui/uiCore";
import { useLoadingValue } from "commons/loading/store/loadingHook";

type GridOptionType = "gridSort" | "gridSub" | "pageable";

/**
 * 통합 grid option 데이터 저장 객체 제작
 * @param option 소트 옵션 키값
 * @param id 저장될 id 값
 * @param value 저장값
 * @returns
 */
const hasGridOptionValue = (
  option: GridOptionType,
  id: string | number,
  value?: string | boolean
) => {
  return { id: option, value: { [id]: value } } as IUiActionValue;
};

/**
 * 그리드 옵션 값 변경 함수
 * @param gridid 그리드 id 값
 * @returns
 */
const useGridOptionChange = (gridid: string) => {
  const { add, remove, commit } = useUiAction();
  return (actionValue: IUiActionValue, removeValue?: IUiActionValue) => {
    if (removeValue) {
      remove(UiType.GRID_OPTION, gridid, removeValue);
    }
    add(UiType.GRID_OPTION, gridid, actionValue);
    commit();
  };
};

/**
 * 그리드 sub 오픈을 위한 값 확인
 * @param gridid 그리드 id 값
 * @param row 서브를 보여줄 row 값
 * @returns
 */
export const useGridSubValue = (gridid: string, row: number) => {
  const { subvalue } = useSelectorEq((state: ICommonsStore) => ({
    subvalue: state.ui.gridOption
      ? state.ui.gridOption[gridid]
        ? state.ui.gridOption[gridid].gridSub
          ? state.ui.gridOption[gridid].gridSub[row]
          : false
        : undefined
      : undefined,
  }));
  return subvalue;
};

/**
 * 그리드 서브 오픈 값을 변경 하기 위한 함수
 * @param gridid 그리드 id 값
 * @param row 서브를 보여줄 row 값
 * @returns
 */
export const useGridSub = (gridid: string, row: number) => {
  const change = useGridOptionChange(gridid);
  return (value: boolean) => {
    change(hasGridOptionValue("gridSub", row, value));
  };
};

/**
 * 그리드 옵션 초기화
 * @param option 그리드 옵션 타입
 * @param value 초기 값 전달
 * @param gridId 그리드 id 값
 */
export const useGridOptionInit = (
  option: GridOptionType,
  value?: { [key: string | number]: string | boolean },
  gridId?: string
) => {
  const initCallback = privateUseInitCallback();
  const removeCallback = privateUseRemoveCallback();

  useEffect(() => {
    if (gridId === undefined) {
      return;
    }

    addInit(
      {
        type: UiType.GRID_OPTION,
        key: gridId,
        value: { id: option, value: value },
      },
      initCallback
    );
    return () => {
      removeEnd(
        {
          type: UiType.GRID_OPTION,
          key: gridId,
          value: option,
        },
        removeCallback
      );
    };
  }, []);
};

/**
 * 그리드 소트 값
 * @param gridid 그리드 id 값
 * @returns
 */
export const useGridSortValue = (gridid: string) => {
  const { gridSort } = useSelectorEq((state: ICommonsStore) => ({
    gridSort: state.ui.gridOption
      ? state.ui.gridOption[gridid]
        ? state.ui.gridOption[gridid].gridSort
          ? [
              Object.keys(state.ui.gridOption[gridid].gridSort)[0] as string,
              Object.values(state.ui.gridOption[gridid].gridSort)[0] as
                | "desc"
                | "asc",
            ]
          : [undefined, undefined]
        : [undefined, undefined]
      : [undefined, undefined],
  }));
  return gridSort;
};

/**
 *
 * @param gridid 그리드 id 값
 * @param sortid
 * @returns
 */
export const useGridSort = (gridid: string, sortid: string) => {
  const change = useGridOptionChange(gridid);
  return (value?: string) => {
    change(hasGridOptionValue("gridSort", sortid, value));
  };
};

/**
 *
 * @param gridid 그리드 id 값
 * @param sortid
 * @returns
 */
export const useGridSortInit = (gridid: string, sortid: string) => {
  const change = useGridOptionChange(gridid);
  return (value?: string) => {
    change(hasGridOptionValue("gridSort", sortid, value));
  };
};

export const useIntersectionObserver = (
  root: React.RefObject<HTMLElement>,
  gridId?: string,
  infiniteInfo?: {
    current: number;
    total: number;
    infiniteCallback: () => void | Promise<void>;
  },
  dataLength?: number
) => {
  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      if (infiniteInfo && infiniteInfo.current < infiniteInfo.total) {
        await infiniteInfo.infiniteCallback();
      }
    }
  };
  if (infiniteInfo && gridId) {
    const { areaLoading } = useLoadingValue(gridId);
    useEffect(() => {
      const observer = new IntersectionObserver(handleObserver, {
        threshold: 0,
      });
      if (root?.current !== null) {
        root.current.style.display = "block";
        observer.observe(root.current);
      }

      return () => observer && observer.disconnect();
    }, [infiniteInfo, dataLength, areaLoading]);
  }
};

export const useGridPageableValue = (id: string) => {
  const { pageable } = useSelectorEq((state: ICommonsStore) => ({
    pageable: state.ui.gridOption
      ? state.ui.gridOption[id]
        ? (state.ui.gridOption[id].pageable as IGridPageableDo)
        : undefined
      : undefined,
  }));
  return pageable;
};

export const useGridPageableChange = (id: string) => {
  const { pageable } = useSelectorEq((state: ICommonsStore) => ({
    pageable: state.ui.gridOption
      ? state.ui.gridOption[id]
        ? (state.ui.gridOption[id].pageable as IGridPageableDo)
        : undefined
      : undefined,
  }));
  const change = useGridOptionChange(id);
  const setPageable = (value?: IGridPageableDo) => {
    change({ id: "pageable", value });
  };
  const setPage = (value: number) => {
    change({ id: "pageable", value: { ...pageable, page: value } });
  };
  const setTotal = (value: number) => {
    change({ id: "pageable", value: { ...pageable, total: value } });
  };
  const setSize = (value: number) => {
    change({ id: "pageable", value: { ...pageable, size: value } });
  };
  return { pageable, setPageable, setPage, setTotal, setSize };
};

export const useGridPageable = (id: string, init: IGridPageableDo) => {
  const { pageable } = useSelectorEq((state: ICommonsStore) => ({
    pageable: state.ui.gridOption
      ? state.ui.gridOption[id]
        ? (state.ui.gridOption[id].pageable as IGridPageableDo)
        : init
      : init,
  }));
  const { setPageable, setPage, setSize, setTotal } = useGridPageableChange(id);
  const initCallback = privateUseInitCallback();
  const removeCallback = privateUseRemoveCallback();
  useEffect(() => {
    if (id === undefined) {
      return;
    }
    addInit(
      {
        type: UiType.GRID_OPTION,
        key: id,
        value: { id: "pageable", value: init },
      },
      initCallback
    );
    return () => {
      removeEnd(
        {
          type: UiType.GRID_OPTION,
          key: id,
          value: "pageable",
        },
        removeCallback
      );
    };
  }, []);
  return { pageable, setPageable, setPage, setTotal, setSize };
};
