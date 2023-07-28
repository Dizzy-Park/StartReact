export interface IGridPosition {
  col: number;
  row: number;
  span: number;
}

export interface IGridSettingLink {
  url: string;
  paramidx: number | number[];
  text?: number;
  target?: string;
}

type KeyData<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type SKeyData<T> = Extract<KeyData<T>, string>;

type SubKS<T> = Extract<
  {
    [K in keyof T]: T[K] extends  // eslint-disable-next-line @typescript-eslint/ban-types
      | Function
      | string
      | number
      | boolean
      | undefined
      ? never
      : K;
  }[keyof T],
  string
>;
type SubKey<T> = `${SubKS<T>}.${SKeyData<SubKS<T>>}`;
// type TreeKey<Data> = `${SKeyData<Data>}.${SKeyData<KeyData<Data>>}.${SKeyData<
//   KeyData<KeyData<Data>>
// >}`;
type PropData<T> = SKeyData<T> | SubKey<T>;

export function subkeySplit<T>(data: T, subkey: SKeyData<T> | SubKey<T>) {
  if (subkey.indexOf(".") === -1) {
    return data[subkey as keyof T];
  } else {
    const ar = subkey.split(".") as [keyof T, keyof T[keyof T]];
    if (data[ar[0]] !== undefined) {
      return data[ar[0]][ar[1]];
    } else {
      return undefined;
    }
  }
}

export type sortType = "desc" | "asc";

export interface IGridSetting<Data> {
  header: string;
  headerElement?: React.FC<{ header: string }>;
  id: Array<PropData<Data>>;
  display?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: React.FC<IGrideCell<any>>;
  isSum?: boolean;
  width?: string;
  link?: IGridSettingLink;
  span?: PropData<Data>;
  tdDisplayNone?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  button?: any;
  sort?: {
    id: string;
    init?: sortType;
    activeColor?: string;
  };
}

export interface IGrideCell<T> {
  position: IGridPosition;
  data: T;
  link?: IGridSettingLink;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonOption?: any;
  change: (position: IGridPosition, value?: T) => void;
}

export interface IGrideSub<T> {
  position: IGridPosition;
  data: T;
}

export interface IGridPageableDo {
  total: number;
  page: number;
  size: number;
}
