import { atom } from "recoil";

// non-persist
// 로딩이 필요할 때 해당 상태를 true
// 로딩이 끝나면 해당 상태를 false

interface Alarm {
  text: string;
}

const isLoadingState = atom({
  key: "isLoading",
  default: false,
});

const alarmModalState = atom<Alarm[]>({
  key: "alarmModal",
  default: [],
});

export { isLoadingState, alarmModalState };
export type { Alarm };
