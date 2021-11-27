import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const userInfoState = atom({
  key: "userInfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

const userListCooldownState = atom({
  key: "userListCooldown",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export { userInfoState, userListCooldownState };
