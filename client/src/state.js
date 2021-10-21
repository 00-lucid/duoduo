import { atom } from "recoil";

// non-persist
// 로딩이 필요할 때 해당 상태를 true
// 로딩이 끝나면 해당 상태를 false
const isLoadingState = atom({
  key: "isLoading",
  value: false,
});

export { isLoadingState };
