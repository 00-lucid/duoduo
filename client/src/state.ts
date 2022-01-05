import { atom } from "recoil";

// non-persist
// 로딩이 필요할 때 해당 상태를 true
// 로딩이 끝나면 해당 상태를 false

interface Alarm {
  text: string;
  type: number;
}

const isLoadingState = atom({
  key: "isLoading",
  default: false,
});

const alarmModalState = atom<Alarm[]>({
  key: "alarmModal",
  default: [],
});

const filtersState = atom<any[]>({
  key: "filters",
  default: [[], []],
});

const socketState = atom<any>({
  key: "socket",
  default: null,
});

export { isLoadingState, alarmModalState, filtersState, socketState };
export type { Alarm };
