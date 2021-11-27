import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const userInfoState = atom({
  key: "userInfo",
  value: {},
  effects_UNSTABLE: [persistAtom],
});

const userListCooldownState = atom({
  key: "userListCooldown",
  value: null,
  effects_UNSTABLE: [persistAtom],
});

export { userInfoState, userListCooldownState };
